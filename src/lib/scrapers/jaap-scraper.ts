import * as cheerio from "cheerio";
import { BaseScraper, ScrapedProperty, ScrapeOptions, defaultScrapeOptions } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const DELAY_MS = 2000; // 2 seconds between requests to be respectful

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class JaapScraper extends BaseScraper {
  source = "jaap" as const;
  private baseUrl = "https://www.jaap.nl";

  async scrape(options: ScrapeOptions = defaultScrapeOptions): Promise<ScrapedProperty[]> {
    const { maxPages, city, minPrice, maxPrice } = options;
    const properties: ScrapedProperty[] = [];

    // Build search URL
    let searchUrl = `${this.baseUrl}/koophuizen/`;

    // Add city filter if specified
    if (city) {
      searchUrl += `${city.toLowerCase()}/`;
    }

    // Add price filters
    const params = new URLSearchParams();
    if (minPrice) params.set("min", minPrice.toString());
    if (maxPrice) params.set("max", maxPrice.toString());
    const paramString = params.toString();
    if (paramString) {
      searchUrl += `?${paramString}`;
    }

    console.warn(`[JaapScraper] Starting scrape from: ${searchUrl}`);

    for (let page = 1; page <= maxPages; page++) {
      const pageUrl = page === 1 ? searchUrl : `${searchUrl}${searchUrl.includes("?") ? "&" : "?"}p=${page}`;

      try {
        console.warn(`[JaapScraper] Fetching page ${page}: ${pageUrl}`);

        const response = await fetch(pageUrl, {
          headers: {
            "User-Agent": USER_AGENT,
            Accept: "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.9,nl;q=0.8",
          },
        });

        if (!response.ok) {
          console.error(`[JaapScraper] Failed to fetch page ${page}: ${response.status}`);
          break;
        }

        const html = await response.text();
        const pageProperties = this.parseListing(html);

        if (pageProperties.length === 0) {
          console.warn(`[JaapScraper] No more properties found on page ${page}`);
          break;
        }

        properties.push(...pageProperties);
        console.warn(`[JaapScraper] Found ${pageProperties.length} properties on page ${page}`);

        // Be respectful - wait between requests
        if (page < maxPages) {
          await sleep(DELAY_MS);
        }
      } catch (error) {
        console.error(`[JaapScraper] Error on page ${page}:`, error);
        break;
      }
    }

    console.warn(`[JaapScraper] Total properties scraped: ${properties.length}`);
    return properties;
  }

  private parseListing(html: string): ScrapedProperty[] {
    const $ = cheerio.load(html);
    const properties: ScrapedProperty[] = [];

    // Jaap.nl uses property cards with class "property-card" or similar
    // The actual selectors may need adjustment based on current site structure
    $(".property-card, [data-testid='property-card'], .search-result").each((_, element) => {
      try {
        const $el = $(element);

        // Extract property URL and ID
        const linkEl = $el.find("a[href*='/te-koop/']").first();
        const url = linkEl.attr("href");
        if (!url) return;

        const fullUrl = url.startsWith("http") ? url : `${this.baseUrl}${url}`;
        const externalId = this.extractIdFromUrl(url);
        if (!externalId) return;

        // Extract title/address
        const title = $el.find("h2, h3, .property-title").first().text().trim() ||
          $el.find("[class*='title']").first().text().trim();

        // Extract price
        const priceText = $el.find(".property-price, [class*='price']").first().text();
        const price = this.parsePrice(priceText);
        if (!price) return; // Skip if no valid price

        // Extract address components
        const addressLine = $el.find(".property-address, [class*='address']").first().text().trim();
        const { address, city, postcode } = this.parseAddress(addressLine || title);

        // Extract size
        const sizeText = $el.find("[class*='surface'], [class*='size'], [class*='area']").first().text();
        const livingAreaSqm = this.parseSize(sizeText);

        // Extract bedrooms
        const bedroomText = $el.find("[class*='bedroom'], [class*='slaapkamer']").first().text();
        const bedrooms = this.parseNumber(bedroomText);

        // Extract photo
        const photoSrc = $el.find("img").first().attr("src") || $el.find("img").first().attr("data-src");
        const photos = photoSrc ? [photoSrc] : [];

        const property: ScrapedProperty = {
          externalId,
          source: "jaap",
          url: fullUrl,
          title: title || address || "Unknown Property",
          description: "",
          price,
          pricePerSqm: livingAreaSqm ? Math.round(price / livingAreaSqm) : null,
          address: address || title,
          city: city || "Unknown",
          postcode: postcode || "",
          latitude: null,
          longitude: null,
          bedrooms,
          bathrooms: null,
          livingAreaSqm,
          plotSizeSqm: null,
          propertyType: null,
          yearBuilt: null,
          energyLabel: null,
          photos,
          listedAt: null,
        };

        properties.push(property);
      } catch (error) {
        console.error("[JaapScraper] Error parsing property:", error);
      }
    });

    return properties;
  }

  async scrapeDetail(url: string): Promise<Partial<ScrapedProperty>> {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch detail page: ${response.status}`);
      }

      const html = await response.text();
      return this.parseDetail(html);
    } catch (error) {
      console.error(`[JaapScraper] Error fetching detail page ${url}:`, error);
      return {};
    }
  }

  private parseDetail(html: string): Partial<ScrapedProperty> {
    const $ = cheerio.load(html);
    const details: Partial<ScrapedProperty> = {};

    // Extract description
    const description = $(".property-description, [class*='description']").first().text().trim();
    if (description) details.description = description;

    // Extract all photos
    const photos: string[] = [];
    $(".property-photo img, [class*='gallery'] img, .swiper img").each((_, img) => {
      const src = $(img).attr("src") || $(img).attr("data-src");
      if (src && !src.includes("placeholder")) {
        photos.push(src);
      }
    });
    if (photos.length > 0) details.photos = photos;

    // Extract energy label
    const energyLabelText = $("[class*='energy-label'], [class*='energielabel']").first().text().trim();
    const energyLabel = energyLabelText.replace(/[^A-G+]/gi, "").toUpperCase();
    if (energyLabel) details.energyLabel = energyLabel;

    // Extract year built
    const yearText = $("[class*='bouwjaar'], [class*='year-built']").first().text();
    const yearBuilt = this.parseNumber(yearText);
    if (yearBuilt && yearBuilt > 1800 && yearBuilt <= new Date().getFullYear()) {
      details.yearBuilt = yearBuilt;
    }

    // Extract bathrooms
    const bathroomText = $("[class*='bathroom'], [class*='badkamer']").first().text();
    const bathrooms = this.parseNumber(bathroomText);
    if (bathrooms) details.bathrooms = bathrooms;

    // Extract plot area
    const plotText = $("[class*='plot'], [class*='perceel'], [class*='kavelmaat']").first().text();
    const plotSize = this.parseSize(plotText);
    if (plotSize) details.plotSizeSqm = plotSize;

    // Extract property type
    const typeText = $("[class*='property-type'], [class*='soort-woning']").first().text().trim();
    if (typeText) details.propertyType = typeText;

    return details;
  }

  private extractIdFromUrl(url: string): string | null {
    // Extract property ID from Jaap.nl URL
    // Example: /te-koop/noord-holland/amsterdam/12345678/
    const match = url.match(/\/(\d{6,})/);
    return match?.[1] ?? null;
  }

  private parsePrice(text: string): number | null {
    if (!text) return null;
    // Extract numbers from price text like "€ 450.000 k.k."
    const cleaned = text.replace(/[^\d]/g, "");
    const price = parseInt(cleaned, 10);
    return price > 10000 ? price : null; // Filter out unrealistic prices
  }

  private parseSize(text: string): number | null {
    if (!text) return null;
    // Extract number from size text like "120 m²"
    const match = text.match(/(\d+)/);
    const value = match?.[1];
    return value ? parseInt(value, 10) : null;
  }

  private parseNumber(text: string): number | null {
    if (!text) return null;
    const match = text.match(/(\d+)/);
    const value = match?.[1];
    return value ? parseInt(value, 10) : null;
  }

  private parseAddress(text: string): { address: string; city: string; postcode: string } {
    // Try to parse Dutch address format
    // Example: "Keizersgracht 123, 1015 CJ Amsterdam"
    const parts = text.split(",").map((p) => p.trim());

    const address = parts[0] || text;
    let city = "";
    let postcode = "";

    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      if (lastPart) {
        // Check for postcode pattern (1234 AB)
        const postcodeMatch = lastPart.match(/(\d{4}\s*[A-Z]{2})\s*(.*)/i);
        if (postcodeMatch && postcodeMatch[1] && postcodeMatch[2] !== undefined) {
          postcode = postcodeMatch[1].replace(/\s+/, " ").toUpperCase();
          city = postcodeMatch[2].trim();
        } else {
          city = lastPart;
        }
      }
    }

    // Common Dutch cities for fallback detection
    const dutchCities = [
      "Amsterdam",
      "Rotterdam",
      "Den Haag",
      "The Hague",
      "Utrecht",
      "Eindhoven",
      "Tilburg",
      "Groningen",
      "Almere",
      "Breda",
      "Nijmegen",
      "Haarlem",
      "Arnhem",
      "Zaanstad",
      "Amersfoort",
      "Apeldoorn",
      "Hoofddorp",
      "Amstelveen",
      "Delft",
      "Leiden",
    ];

    if (!city) {
      for (const c of dutchCities) {
        if (text.toLowerCase().includes(c.toLowerCase())) {
          city = c;
          break;
        }
      }
    }

    return { address, city: city || "Unknown", postcode };
  }
}

// Export singleton instance
export const jaapScraper = new JaapScraper();
