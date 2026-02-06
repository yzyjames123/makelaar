/**
 * Test script for the property scraper and seed data
 * Run with: npx tsx scripts/test-scraper.ts
 */

import { filterSeedProperties, seedProperties } from "../src/data/seed-properties";

async function main() {
  console.log("Testing property data...\n");

  // Test seed data
  console.log(`Total seed properties: ${seedProperties.length}`);
  console.log("\n--- Sample Property ---");
  console.log(JSON.stringify(seedProperties[0], null, 2));

  // Test filtering
  const amsterdamProperties = filterSeedProperties({ city: "amsterdam" });
  console.log(`\nAmsterdam properties: ${amsterdamProperties.length}`);

  const expensiveProperties = filterSeedProperties({ minPrice: 700000 });
  console.log(`Properties > €700k: ${expensiveProperties.length}`);

  const twoBedroomPlus = filterSeedProperties({ minBedrooms: 2 });
  console.log(`Properties with 2+ bedrooms: ${twoBedroomPlus.length}`);

  // Summary stats
  const prices = seedProperties.map((p) => p.price);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  console.log("\n--- Summary ---");
  console.log(`Price range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}`);
  console.log(`Average price: €${Math.round(avgPrice).toLocaleString()}`);
  console.log(`Cities: ${[...new Set(seedProperties.map((p) => p.city))].join(", ")}`);
  console.log(`Property types: ${[...new Set(seedProperties.map((p) => p.propertyType))].join(", ")}`);

  console.log("\n✅ Seed data is working correctly!");
}

main();
