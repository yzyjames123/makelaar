"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Building2, Filter, Loader2, Search, AlertCircle } from "lucide-react";
import { PropertyCard, Property } from "@/components/properties/property-card";
import {
  PropertyFiltersComponent,
  PropertyFiltersState,
  defaultFilters,
} from "@/components/properties/property-filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertiesResponse {
  properties: Property[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  filters: {
    cities: string[];
  };
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<PropertyFiltersState>(defaultFilters);

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/properties");
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data: PropertiesResponse = await response.json();
      setProperties(data.properties);
      setAvailableCities(data.filters.cities);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter properties client-side
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !property.title.toLowerCase().includes(searchLower) &&
          !property.address.toLowerCase().includes(searchLower) &&
          !property.city.toLowerCase().includes(searchLower) &&
          !(property.description?.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }

      // City filter
      if (filters.city.length > 0 && !filters.city.includes(property.city)) {
        return false;
      }

      // Price filters
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms filter
      if (
        filters.minBedrooms &&
        (!property.bedrooms || property.bedrooms < filters.minBedrooms)
      ) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Stats
  const stats = useMemo(() => {
    const avgPrice =
      filteredProperties.length > 0
        ? Math.round(
            filteredProperties.reduce((sum, p) => sum + p.price, 0) /
              filteredProperties.length
          )
        : 0;
    const cities = new Set(filteredProperties.map((p) => p.city)).size;
    return {
      total: filteredProperties.length,
      avgPrice,
      cities,
    };
  }, [filteredProperties]);

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Property Search</h1>
        <p className="text-muted-foreground text-lg mb-4">
          Browse {stats.total > 0 ? stats.total : "available"} properties across
          the Netherlands
        </p>

        {/* Quick Stats */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="text-sm py-1 px-3">
            {stats.total} Properties
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">
            {stats.cities} Cities
          </Badge>
          {stats.avgPrice > 0 && (
            <Badge variant="secondary" className="text-sm py-1 px-3">
              Avg. €{Math.round(stats.avgPrice / 1000)}k
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-4">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <span className="text-sm text-muted-foreground">
                {filteredProperties.length} results
              </span>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <PropertyFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                availableCities={availableCities}
              />
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </p>
            <Button variant="outline" size="sm" onClick={fetchProperties}>
              <Search className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error loading properties</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" onClick={fetchProperties}>
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && properties.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
              <p className="text-muted-foreground mb-4">
                Properties will appear here once scraped from listing sites.
              </p>
              <p className="text-sm text-muted-foreground">
                Use the admin panel or API to trigger a property scrape.
              </p>
            </div>
          )}

          {/* No Results After Filter */}
          {!isLoading &&
            !error &&
            properties.length > 0 &&
            filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No matching properties</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters(defaultFilters)}
                >
                  Clear Filters
                </Button>
              </div>
            )}

          {/* Property Grid */}
          {!isLoading && !error && filteredProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-2xl mx-auto mt-16 text-center p-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-bold mb-3">
          Need Help Finding Your Perfect Home?
        </h2>
        <p className="text-muted-foreground mb-6">
          Connect with a local buyers&apos; agent who specializes in helping
          expats navigate the Dutch housing market.
        </p>
        <Button asChild size="lg">
          <Link href="/intake">Get Started Free</Link>
        </Button>
      </div>
    </main>
  );
}
