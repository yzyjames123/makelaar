"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const activeFilterCount = [
    filters.search ? 1 : 0,
    filters.city.length > 0 ? 1 : 0,
    filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0,
    filters.minBedrooms !== null ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const activePriceRange = PRICE_RANGES.find(
    (r) => r.min === filters.minPrice && r.max === filters.maxPrice
  );

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Mobile Header - collapsible */}
      <button
        className="flex w-full items-center justify-between p-4 sm:hidden"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {/* Filter Content */}
      <div
        className={cn(
          "space-y-5 p-4 sm:p-5",
          "sm:block",
          isExpanded ? "block border-t" : "hidden"
        )}
      >
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
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
              className="pl-9 h-11 sm:h-9"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((range) => {
              const isActive = activePriceRange?.label === range.label;
              return (
                <Badge
                  key={range.label}
                  variant={isActive ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer py-2 px-3 text-sm transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "min-h-[40px] sm:min-h-0 sm:py-1 sm:px-2.5",
                    isActive && "shadow-sm"
                  )}
                  onClick={() =>
                    isActive
                      ? setPriceRange(null, null)
                      : setPriceRange(range.min, range.max)
                  }
                >
                  {range.label}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Bedrooms</Label>
          <div className="flex flex-wrap gap-2">
            {BEDROOM_OPTIONS.map((num) => {
              const isActive = filters.minBedrooms === num;
              return (
                <Badge
                  key={num}
                  variant={isActive ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer py-2 px-4 text-sm transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "min-h-[40px] sm:min-h-0 sm:py-1 sm:px-3",
                    isActive && "shadow-sm"
                  )}
                  onClick={() =>
                    setMinBedrooms(isActive ? null : num)
                  }
                >
                  {num}+
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Cities */}
        {availableCities.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">City</Label>
            <div className="flex flex-wrap gap-2">
              {availableCities.slice(0, 10).map((city) => {
                const isActive = filters.city.includes(city);
                return (
                  <Badge
                    key={city}
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer py-2 px-3 text-sm transition-all",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "min-h-[40px] sm:min-h-0 sm:py-1 sm:px-2.5",
                      isActive && "shadow-sm"
                    )}
                    onClick={() => toggleCity(city)}
                  >
                    {city}
                  </Badge>
                );
              })}
              {availableCities.length > 10 && (
                <Badge
                  variant="secondary"
                  className="py-2 px-3 min-h-[40px] sm:min-h-0 sm:py-1 sm:px-2.5"
                >
                  +{availableCities.length - 10} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full min-h-[48px] sm:min-h-0 mt-2"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
}
