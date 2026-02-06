import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { filterSeedProperties, seedProperties } from "@/data/seed-properties";
import { FundaScraper } from "@/lib/scrapers/funda-scraper";
import { propertyService } from "@/lib/services/property-service";

const scrapeRequestSchema = z.object({
  source: z.enum(["funda", "seed"]).default("seed"),
  city: z.string().nullable().default(null),
  minPrice: z.number().nullable().default(null),
  maxPrice: z.number().nullable().default(null),
  maxPages: z.number().min(1).max(10).default(3),
});

/**
 * POST /api/properties/scrape
 * Trigger a property scrape from the specified source
 *
 * Sources:
 * - seed: Load pre-defined seed data (works immediately, for development)
 * - funda: Live scraping from Funda.nl (may be blocked by bot detection)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = scrapeRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { source, city, minPrice, maxPrice, maxPages } = validationResult.data;

    console.warn(`[Scrape API] Starting scrape from ${source}`, {
      city,
      minPrice,
      maxPrice,
      maxPages,
    });

    let scrapedProperties;

    switch (source) {
      case "seed": {
        // Use seed data (always works, for development)
        scrapedProperties = filterSeedProperties({
          city,
          minPrice,
          maxPrice,
        });
        console.warn(`[Scrape API] Loaded ${scrapedProperties.length} seed properties`);
        break;
      }
      case "funda": {
        // Live scraping (may be blocked by bot detection)
        const scraper = new FundaScraper();
        scrapedProperties = await scraper.scrape({
          city,
          minPrice,
          maxPrice,
          maxPages,
        });

        // If scraping returns nothing, fall back to seed data
        if (scrapedProperties.length === 0) {
          console.warn("[Scrape API] Funda scraping blocked, using seed data");
          scrapedProperties = filterSeedProperties({ city, minPrice, maxPrice });
        }
        break;
      }
      default:
        return NextResponse.json({ error: "Invalid source" }, { status: 400 });
    }

    // Store properties in database
    const result = await propertyService.upsertProperties(scrapedProperties);

    console.warn(`[Scrape API] Scrape completed:`, result);

    return NextResponse.json({
      message: "Scrape completed",
      source,
      result,
    });
  } catch (error) {
    console.error("[Scrape API] Error:", error);
    return NextResponse.json(
      { error: "Scrape failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/properties/scrape
 * Get scraping status and statistics
 */
export async function GET() {
  try {
    const stats = await propertyService.getStats();
    const cities = await propertyService.getCities();

    return NextResponse.json({
      stats,
      cities,
      seedDataAvailable: seedProperties.length,
      availableSources: [
        { id: "seed", name: "Seed Data", status: "active", description: "Pre-defined properties for development" },
        { id: "funda", name: "Funda.nl", status: "limited", description: "Live scraping (may be blocked)" },
      ],
    });
  } catch (error) {
    console.error("[Scrape API] Error getting stats:", error);
    return NextResponse.json(
      { error: "Failed to get stats" },
      { status: 500 }
    );
  }
}
