"use client";

import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SchoolFilters {
  search: string;
  curriculum: string[];
  city: string[];
  grades: string[];
}

interface SchoolFiltersProps {
  filters: SchoolFilters;
  onFiltersChange: (filters: SchoolFilters) => void;
  availableCities: string[];
}

const CURRICULA = ["IB", "British", "American", "French", "German", "European"];
const GRADES = ["Primary", "Secondary"];

export function SchoolFiltersComponent({
  filters,
  onFiltersChange,
  availableCities,
}: SchoolFiltersProps) {
  const toggleArrayFilter = (
    key: "curriculum" | "city" | "grades",
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      curriculum: [],
      city: [],
      grades: [],
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.curriculum.length > 0 ||
    filters.city.length > 0 ||
    filters.grades.length > 0;

  return (
    <div className="space-y-6 p-4 bg-muted/30 rounded-lg">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search Schools</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="School name or location..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-9"
          />
        </div>
      </div>

      {/* Curriculum */}
      <div className="space-y-2">
        <Label>Curriculum</Label>
        <div className="flex flex-wrap gap-2">
          {CURRICULA.map((curriculum) => (
            <Badge
              key={curriculum}
              variant={
                filters.curriculum.includes(curriculum) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => toggleArrayFilter("curriculum", curriculum)}
            >
              {curriculum}
            </Badge>
          ))}
        </div>
      </div>

      {/* Grades */}
      <div className="space-y-2">
        <Label>Grade Levels</Label>
        <div className="flex flex-wrap gap-2">
          {GRADES.map((grade) => (
            <Badge
              key={grade}
              variant={filters.grades.includes(grade) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleArrayFilter("grades", grade)}
            >
              {grade}
            </Badge>
          ))}
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>City</Label>
        <div className="flex flex-wrap gap-2">
          {availableCities.map((city) => (
            <Badge
              key={city}
              variant={filters.city.includes(city) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleArrayFilter("city", city)}
            >
              {city}
            </Badge>
          ))}
        </div>
      </div>

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
