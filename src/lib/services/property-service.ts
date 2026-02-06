import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/schema";
import type { ScrapedProperty, ScrapeResult } from "@/lib/scrapers/types";

export class PropertyService {
  /**
   * Store or update scraped properties in the database
   */
  async upsertProperties(scrapedProperties: ScrapedProperty[]): Promise<ScrapeResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let propertiesNew = 0;
    let propertiesUpdated = 0;

    for (const scraped of scrapedProperties) {
      try {
        // Check if property already exists
        const existing = await db
          .select()
          .from(properties)
          .where(
            and(
              eq(properties.externalId, scraped.externalId),
              eq(properties.source, scraped.source)
            )
          )
          .limit(1);

        if (existing.length > 0) {
          const existingProperty = existing[0];
          if (!existingProperty) continue;

          // Update existing property
          await db
            .update(properties)
            .set({
              url: scraped.url,
              title: scraped.title,
              description: scraped.description || existingProperty.description,
              price: scraped.price,
              pricePerSqm: scraped.pricePerSqm,
              address: scraped.address,
              city: scraped.city,
              postcode: scraped.postcode,
              latitude: scraped.latitude,
              longitude: scraped.longitude,
              bedrooms: scraped.bedrooms,
              bathrooms: scraped.bathrooms,
              livingAreaSqm: scraped.livingAreaSqm,
              plotSizeSqm: scraped.plotSizeSqm,
              propertyType: scraped.propertyType,
              yearBuilt: scraped.yearBuilt,
              energyLabel: scraped.energyLabel,
              photos: scraped.photos,
              updatedAt: new Date(),
            })
            .where(eq(properties.id, existingProperty.id));
          propertiesUpdated++;
        } else {
          // Insert new property
          await db.insert(properties).values({
            externalId: scraped.externalId,
            source: scraped.source,
            url: scraped.url,
            title: scraped.title,
            description: scraped.description || "",
            price: scraped.price,
            pricePerSqm: scraped.pricePerSqm,
            address: scraped.address,
            city: scraped.city,
            postcode: scraped.postcode,
            latitude: scraped.latitude,
            longitude: scraped.longitude,
            bedrooms: scraped.bedrooms,
            bathrooms: scraped.bathrooms,
            livingAreaSqm: scraped.livingAreaSqm,
            plotSizeSqm: scraped.plotSizeSqm,
            propertyType: scraped.propertyType,
            yearBuilt: scraped.yearBuilt,
            energyLabel: scraped.energyLabel,
            photos: scraped.photos,
            status: "active",
          });
          propertiesNew++;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        errors.push(`Failed to store property ${scraped.externalId}: ${message}`);
        console.error(`[PropertyService] Error storing property:`, error);
      }
    }

    const duration = Date.now() - startTime;

    return {
      success: errors.length === 0,
      propertiesScraped: scrapedProperties.length,
      propertiesNew,
      propertiesUpdated,
      errors,
      duration,
    };
  }

  /**
   * Get all active properties with optional filters
   */
  async getProperties(filters: {
    city: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minBedrooms: number | null;
    limit: number;
    offset: number;
  }) {
    const { city, minPrice, maxPrice, minBedrooms, limit, offset } = filters;

    // Build query with filters
    const query = db.select().from(properties).where(eq(properties.status, "active"));

    // Note: For more complex filtering, use SQL builder
    // This is a simplified version
    const result = await query.limit(limit).offset(offset);

    // Apply filters in memory for now (can be optimized with SQL later)
    return result.filter((p) => {
      if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
      if (minPrice && p.price < minPrice) return false;
      if (maxPrice && p.price > maxPrice) return false;
      if (minBedrooms && (!p.bedrooms || p.bedrooms < minBedrooms)) return false;
      return true;
    });
  }

  /**
   * Get a single property by ID
   */
  async getPropertyById(id: string) {
    const result = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id))
      .limit(1);
    return result[0] || null;
  }

  /**
   * Get property by external ID and source
   */
  async getPropertyByExternalId(externalId: string, source: string) {
    const result = await db
      .select()
      .from(properties)
      .where(
        and(eq(properties.externalId, externalId), eq(properties.source, source))
      )
      .limit(1);
    return result[0] || null;
  }

  /**
   * Mark a property as inactive (delisted)
   */
  async markInactive(id: string) {
    await db
      .update(properties)
      .set({ status: "inactive", updatedAt: new Date() })
      .where(eq(properties.id, id));
  }

  /**
   * Get unique cities from properties
   */
  async getCities(): Promise<string[]> {
    const result = await db.selectDistinct({ city: properties.city }).from(properties);
    return result.map((r) => r.city).filter(Boolean).sort();
  }

  /**
   * Get property statistics
   */
  async getStats() {
    const allProperties = await db.select().from(properties);
    const active = allProperties.filter((p) => p.status === "active");

    const cities = new Set(active.map((p) => p.city));
    const avgPrice =
      active.length > 0
        ? Math.round(active.reduce((sum, p) => sum + p.price, 0) / active.length)
        : 0;

    return {
      total: allProperties.length,
      active: active.length,
      cities: cities.size,
      avgPrice,
      sources: {
        jaap: active.filter((p) => p.source === "jaap").length,
        funda: active.filter((p) => p.source === "funda").length,
        pararius: active.filter((p) => p.source === "pararius").length,
      },
    };
  }
}

export const propertyService = new PropertyService();
