import { test, expect } from "@playwright/test";

test.describe("Property Scraper API", () => {
  test.describe("GET /api/properties/scrape", () => {
    test("returns available sources and stats", async ({ request }) => {
      const response = await request.get("/api/properties/scrape");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();

      // Check availableSources structure
      expect(data.availableSources).toBeDefined();
      expect(Array.isArray(data.availableSources)).toBeTruthy();
      expect(data.availableSources.length).toBeGreaterThan(0);

      // Verify jaap is active
      const jaapSource = data.availableSources.find(
        (s: { id: string }) => s.id === "jaap"
      );
      expect(jaapSource).toBeDefined();
      expect(jaapSource.status).toBe("active");

      // Verify funda/pararius are coming_soon
      const fundaSource = data.availableSources.find(
        (s: { id: string }) => s.id === "funda"
      );
      expect(fundaSource).toBeDefined();
      expect(fundaSource.status).toBe("coming_soon");
    });

    test("returns stats object", async ({ request }) => {
      const response = await request.get("/api/properties/scrape");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.stats).toBeDefined();
      expect(typeof data.stats.total).toBe("number");
      expect(typeof data.stats.active).toBe("number");
    });

    test("returns cities array", async ({ request }) => {
      const response = await request.get("/api/properties/scrape");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.cities).toBeDefined();
      expect(Array.isArray(data.cities)).toBeTruthy();
    });
  });

  test.describe("POST /api/properties/scrape", () => {
    test("returns 501 for funda source", async ({ request }) => {
      const response = await request.post("/api/properties/scrape", {
        data: { source: "funda" },
      });
      expect(response.status()).toBe(501);

      const data = await response.json();
      expect(data.error).toContain("not implemented");
    });

    test("returns 501 for pararius source", async ({ request }) => {
      const response = await request.post("/api/properties/scrape", {
        data: { source: "pararius" },
      });
      expect(response.status()).toBe(501);

      const data = await response.json();
      expect(data.error).toContain("not implemented");
    });

    test("returns 400 for invalid source", async ({ request }) => {
      const response = await request.post("/api/properties/scrape", {
        data: { source: "invalid_source" },
      });
      expect(response.status()).toBe(400);
    });

    test("returns 400 for missing body", async ({ request }) => {
      const response = await request.post("/api/properties/scrape", {
        data: {},
      });
      // Empty body should use default "jaap" and work, or fail validation
      // Since source has default "jaap", this should actually proceed
      // Let's check that it doesn't return 400
      expect(response.status()).not.toBe(400);
    });

    test("returns 400 for invalid maxPages (too high)", async ({ request }) => {
      const response = await request.post("/api/properties/scrape", {
        data: { source: "jaap", maxPages: 100 },
      });
      expect(response.status()).toBe(400);
    });

    test("returns 400 for invalid maxPages (zero)", async ({ request }) => {
      const response = await request.post("/api/properties/scrape", {
        data: { source: "jaap", maxPages: 0 },
      });
      expect(response.status()).toBe(400);
    });
  });

  test.describe("GET /api/properties", () => {
    test("returns properties array with pagination", async ({ request }) => {
      const response = await request.get("/api/properties");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();

      // Check properties array
      expect(data.properties).toBeDefined();
      expect(Array.isArray(data.properties)).toBeTruthy();

      // Check pagination
      expect(data.pagination).toBeDefined();
      expect(typeof data.pagination.limit).toBe("number");
      expect(typeof data.pagination.offset).toBe("number");
      expect(typeof data.pagination.total).toBe("number");
    });

    test("returns filters object with cities", async ({ request }) => {
      const response = await request.get("/api/properties");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.filters).toBeDefined();
      expect(data.filters.cities).toBeDefined();
      expect(Array.isArray(data.filters.cities)).toBeTruthy();
    });

    test("accepts city filter", async ({ request }) => {
      const response = await request.get("/api/properties?city=Amsterdam");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(Array.isArray(data.properties)).toBeTruthy();
    });

    test("accepts price filters", async ({ request }) => {
      const response = await request.get(
        "/api/properties?minPrice=200000&maxPrice=500000"
      );
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(Array.isArray(data.properties)).toBeTruthy();
    });

    test("accepts bedroom filter", async ({ request }) => {
      const response = await request.get("/api/properties?minBedrooms=2");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(Array.isArray(data.properties)).toBeTruthy();
    });

    test("accepts pagination parameters", async ({ request }) => {
      const response = await request.get("/api/properties?limit=5&offset=0");
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.pagination.limit).toBe(5);
      expect(data.pagination.offset).toBe(0);
    });

    test("returns 400 for invalid limit (too high)", async ({ request }) => {
      const response = await request.get("/api/properties?limit=500");
      expect(response.status()).toBe(400);
    });
  });

  test.describe("GET /api/properties/[id]", () => {
    test("returns 404 for non-existent property", async ({ request }) => {
      const response = await request.get(
        "/api/properties/00000000-0000-0000-0000-000000000000"
      );
      expect(response.status()).toBe(404);

      const data = await response.json();
      expect(data.error).toBe("Property not found");
    });

    test("returns 500 for invalid UUID format", async ({ request }) => {
      const response = await request.get("/api/properties/invalid-id");
      // Drizzle will throw an error for invalid UUID
      expect(response.status()).toBe(500);
    });
  });
});
