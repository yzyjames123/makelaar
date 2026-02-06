export interface ScrapedProperty {
  externalId: string;
  source: "jaap" | "funda" | "pararius";
  url: string;
  title: string;
  description: string;
  price: number;
  pricePerSqm: number | null;
  address: string;
  city: string;
  postcode: string;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  livingAreaSqm: number | null;
  plotSizeSqm: number | null;
  propertyType: string | null;
  yearBuilt: number | null;
  energyLabel: string | null;
  photos: string[];
  listedAt: Date | null;
}

export interface ScrapeResult {
  success: boolean;
  propertiesScraped: number;
  propertiesNew: number;
  propertiesUpdated: number;
  errors: string[];
  duration: number;
}

export interface ScrapeOptions {
  maxPages: number;
  minPrice: number | null;
  maxPrice: number | null;
  city: string | null;
}

export const defaultScrapeOptions: ScrapeOptions = {
  maxPages: 3,
  minPrice: null,
  maxPrice: null,
  city: null,
};

export abstract class BaseScraper {
  abstract source: "jaap" | "funda" | "pararius";
  abstract scrape(options: ScrapeOptions): Promise<ScrapedProperty[]>;
}
