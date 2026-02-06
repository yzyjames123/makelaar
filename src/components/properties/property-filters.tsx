"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Internal state - all fields required (no optional)
export interface PropertyFiltersState {
  search: string;
  city: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
}

// Default empty state
export const defaultFilters: PropertyFiltersState = {
  search: "",
  city: [],
  minPrice: null,
  maxPrice: null,
  minBedrooms: null,
};

interface PropertyFiltersProps {
  filters: PropertyFiltersState;
  onFiltersChange: (filters: PropertyFiltersState) => void;
  availableCities: string[];
}

const PRICE_RANGES = [
  { label: "Under €200k", min: 0, max: 200000 },
  { label: "€200k - €350k", min: 200000, max: 350000 },
  { label: "€350k - €500k", min: 350000, max: 500000 },
  { label: "€500k - €750k", min: 500000, max: 750000 },
  { label: "€750k+", min: 750000, max: null },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

export function PropertyFiltersComponent({
  filters,
  onFiltersChange,
  availableCities,
}: PropertyFiltersProps) {
  const toggleCity = (city: string) => {
    const current = filters.city;
    const updated = current.includes(city)
      ? current.filter((c) => c !== city)
      : [...current, city];
    onFiltersChange({ ...filters, city: updated });
  };

  const setPriceRange = (min: number | null, max: number | null) => {
    onFiltersChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const setMinBedrooms = (bedrooms: number | null) => {
    onFiltersChange({ ...filters, minBedrooms: bedrooms });
  };

  const clearFilters = () => {
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.search ||
    filters.city.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minBedrooms !== null;

  const activePriceRange = PRICE_RANGES.find(
    (r) => r.min === filters.minPrice && r.max === filters.maxPrice
  );

  return (
    <div className="space-y-6 p-4 bg-muted/30 rounded-lg">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Address, city, or keyword..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-9"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((range) => (
            <Badge
              key={range.label}
              variant={
                activePriceRange?.label === range.label ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() =>
                activePriceRange?.label === range.label
                  ? setPriceRange(null, null)
                  : setPriceRange(range.min, range.max)
              }
            >
              {range.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <Label>Minimum Bedrooms</Label>
        <div className="flex flex-wrap gap-2">
          {BEDROOM_OPTIONS.map((num) => (
            <Badge
              key={num}
              variant={filters.minBedrooms === num ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                setMinBedrooms(filters.minBedrooms === num ? null : num)
              }
            >
              {num}+ bed{num > 1 ? "s" : ""}
            </Badge>
          ))}
        </div>
      </div>

      {/* Cities */}
      {availableCities.length > 0 && (
        <div className="space-y-2">
          <Label>City</Label>
          <div className="flex flex-wrap gap-2">
            {availableCities.slice(0, 10).map((city) => (
              <Badge
                key={city}
                variant={filters.city.includes(city) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCity(city)}
              >
                {city}
              </Badge>
            ))}
            {availableCities.length > 10 && (
              <Badge variant="secondary" className="cursor-default">
                +{availableCities.length - 10} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
