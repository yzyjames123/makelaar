import { chromium, Browser, Page } from "playwright";
import { ScrapedProperty } from "./types";

const DELAY_MS = 1500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface FundaScrapeOptions {
  city?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  maxPages?: number;
}

interface RawProperty {
  href: string;
  address: string;
  price: string;
  details: string[];
}

/**
 * Scrapes property listings from Funda.nl using Playwright
 */
export class FundaScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
    this.page = await this.browser.newPage({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 800 },
    });

    // Make navigator.webdriver undefined to avoid detection
    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  async scrape(options: FundaScrapeOptions = {}): Promise<ScrapedProperty[]> {
    const { city = "amsterdam", minPrice, maxPrice, maxPages = 3 } = options;
    const properties: ScrapedProperty[] = [];

    try {
      await this.init();

      // Build search URL
      const cityParam = city ? `["${city.toLowerCase()}"]` : '["nederland"]';
      let searchUrl = `https://www.funda.nl/zoeken/koop?selected_area=${encodeURIComponent(cityParam)}`;

      if (minPrice && maxPrice) {
        searchUrl += `&price="${minPrice}-${maxPrice}"`;
      } else if (minPrice) {
        searchUrl += `&price="${minPrice}-"`;
      } else if (maxPrice) {
        searchUrl += `&price="-${maxPrice}"`;
      }

      console.warn(`[FundaScraper] Starting scrape from: ${searchUrl}`);

      // Navigate to search page
      await this.page!.goto(searchUrl, { waitUntil: "load", timeout: 30000 });

      // Wait for page to fully render
      await sleep(2000);

      // Handle cookie consent
      await this.handleCookieConsent();

      // Wait for listings to appear
      try {
        await this.page!.waitForSelector('a[href*="/detail/koop/"]', { timeout: 10000 });
      } catch {
        console.warn("[FundaScraper] Could not find property listings, page may not have loaded");
      }

      // Additional wait for dynamic content
      await sleep(1000);

      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        console.warn(`[FundaScraper] Scraping page ${pageNum}...`);

        const pageProperties = await this.extractProperties();

        if (pageProperties.length === 0) {
          console.warn(`[FundaScraper] No properties found on page ${pageNum}, stopping`);
          break;
        }

        properties.push(...pageProperties);
        console.warn(`[FundaScraper] Found ${pageProperties.length} properties on page ${pageNum}`);

        // Check if there's a next page
        if (pageNum < maxPages) {
          const hasNextPage = await this.goToNextPage();
          if (!hasNextPage) {
            console.warn("[FundaScraper] No more pages available");
            break;
          }
          await sleep(DELAY_MS);
        }
      }

      console.warn(`[FundaScraper] Total properties scraped: ${properties.length}`);
      return properties;
    } finally {
      await this.close();
    }
  }

  private async handleCookieConsent(): Promise<void> {
    try {
      const acceptButton = this.page!.getByRole("button", { name: "Alles accepteren" });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await sleep(500);
      }
    } catch {
      // Cookie dialog might not appear
    }
  }

  private async extractProperties(): Promise<ScrapedProperty[]> {
    const properties: ScrapedProperty[] = [];

    // Extract raw data from the page
    const rawProperties = await this.page!.evaluate(() => {
      const results: Array<{
        href: string;
        address: string;
        price: string;
        details: string[];
      }> = [];
      const seenUrls = new Set<string>();

      // Find all h2 headings that contain links to property details
      const headings = document.querySelectorAll("h2");

      headings.forEach((h2) => {
        const link = h2.querySelector('a[href*="/detail/koop/"]');
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || seenUrls.has(href)) return;

        const h2Text = h2.textContent?.trim() || "";
        // Only process if it looks like an address (has postcode pattern)
        if (!h2Text.match(/\d{4}\s*[A-Z]{2}/i)) return;

        seenUrls.add(href);

        // Find the parent card container (go up until we find a container with price)
        let container: HTMLElement | null = h2.parentElement;
        let priceText = "";
        const listTexts: string[] = [];

        // Walk up to find the right container
        for (let i = 0; i < 5 && container; i++) {
          const text = container.textContent || "";
          if (text.includes("€")) {
            // Extract price
            const priceMatch = text.match(/€\s*([\d.,]+)/);
            if (priceMatch) priceText = priceMatch[0];

            // Extract list items
            const lists = container.querySelectorAll("li");
            lists.forEach((li) => {
              const liText = li.textContent?.trim();
              if (liText) listTexts.push(liText);
            });
            break;
          }
          container = container.parentElement;
        }

        results.push({
          href,
          address: h2Text,
          price: priceText,
          details: listTexts.slice(0, 4),
        });
      });

      return results;
    });

    // Convert raw data to ScrapedProperty objects
    for (const raw of rawProperties) {
      const property = this.parseRawProperty(raw);
      if (property) {
        properties.push(property);
      }
    }

    return properties;
  }

  private parseRawProperty(raw: RawProperty): ScrapedProperty | null {
    const price = this.parsePrice(raw.price);
    if (!price) return null;

    const externalId = this.extractIdFromUrl(raw.href);
    if (!externalId) return null;

    // Parse address (format: "Street 123  1234 AB City")
    const { address, postcode, city } = this.parseAddress(raw.address);

    // Parse details array
    let livingAreaSqm: number | null = null;
    let bedrooms: number | null = null;
    let energyLabel: string | null = null;

    for (const detail of raw.details) {
      const trimmed = detail.trim();

      // Size (e.g., "60 m²")
      if (trimmed.includes("m²")) {
        const sizeMatch = trimmed.match(/(\d+)\s*m²/);
        if (sizeMatch && sizeMatch[1] && !livingAreaSqm) {
          livingAreaSqm = parseInt(sizeMatch[1], 10);
        }
      }
      // Rooms (just a number)
      else if (/^\d+$/.test(trimmed)) {
        bedrooms = parseInt(trimmed, 10);
      }
      // Energy label (A++, A+, A, B, C, D, E, F, G)
      else if (/^[A-G]\+{0,2}$/i.test(trimmed)) {
        energyLabel = trimmed.toUpperCase();
      }
    }

    return {
      externalId,
      source: "funda",
      url: `https://www.funda.nl${raw.href}`,
      title: address,
      description: "",
      price,
      pricePerSqm: livingAreaSqm ? Math.round(price / livingAreaSqm) : null,
      address,
      city: city || "Unknown",
      postcode,
      latitude: null,
      longitude: null,
      bedrooms,
      bathrooms: null,
      livingAreaSqm,
      plotSizeSqm: null,
      propertyType: this.extractPropertyType(raw.href),
      yearBuilt: null,
      energyLabel,
      photos: [],
      listedAt: null,
    };
  }

  private parseAddress(text: string): { address: string; postcode: string; city: string } {
    // Format: "Street 123  1234 AB City"
    const postcodeMatch = text.match(/(\d{4}\s*[A-Z]{2})/i);

    if (!postcodeMatch || postcodeMatch.index === undefined || !postcodeMatch[1]) {
      return { address: text, postcode: "", city: "" };
    }

    const address = text.substring(0, postcodeMatch.index).trim();
    const afterPostcode = text.substring(postcodeMatch.index + postcodeMatch[0].length).trim();
    const postcode = postcodeMatch[1].replace(/\s+/, " ").toUpperCase();

    return { address, postcode, city: afterPostcode };
  }

  private parsePrice(text: string): number | null {
    if (!text) return null;
    const cleaned = text.replace(/[^\d]/g, "");
    const price = parseInt(cleaned, 10);
    return price > 50000 ? price : null;
  }

  private extractIdFromUrl(url: string): string | null {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1] || null;
  }

  private extractPropertyType(url: string): string | null {
    const match = url.match(/\/detail\/koop\/[^/]+\/([^-]+)-/);
    if (match && match[1]) {
      const typeMap: Record<string, string> = {
        appartement: "Apartment",
        huis: "House",
        villa: "Villa",
        penthouse: "Penthouse",
        studio: "Studio",
        woonboot: "Houseboat",
        bungalow: "Bungalow",
      };
      return typeMap[match[1]] || match[1];
    }
    return null;
  }

  private async goToNextPage(): Promise<boolean> {
    try {
      const nextLink = this.page!.locator('a:has-text("Volgende")');
      if (await nextLink.isVisible()) {
        await nextLink.click();
        await this.page!.waitForLoadState("networkidle");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}

export const fundaScraper = new FundaScraper();
