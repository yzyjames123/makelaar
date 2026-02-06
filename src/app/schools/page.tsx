"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Filter } from "lucide-react";
import { SchoolCard, School } from "@/components/schools/school-card";
import {
  SchoolFiltersComponent,
  SchoolFilters,
} from "@/components/schools/school-filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import schoolsData from "@/data/schools.json";

const schools: School[] = schoolsData as School[];

export default function SchoolsPage() {
  const [filters, setFilters] = useState<SchoolFilters>({
    search: "",
    curriculum: [],
    city: [],
    grades: [],
  });
  const [showFilters, setShowFilters] = useState(true);

  // Get unique cities from data
  const availableCities = useMemo(() => {
    const cities = [...new Set(schools.map((s) => s.city))];
    return cities.sort();
  }, []);

  // Filter schools
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !school.name.toLowerCase().includes(searchLower) &&
          !school.city.toLowerCase().includes(searchLower) &&
          !school.description.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Curriculum filter
      if (
        filters.curriculum.length > 0 &&
        !filters.curriculum.includes(school.curriculum)
      ) {
        return false;
      }

      // City filter
      if (filters.city.length > 0 && !filters.city.includes(school.city)) {
        return false;
      }

      // Grades filter
      if (
        filters.grades.length > 0 &&
        !filters.grades.some((grade) => school.grades.includes(grade))
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    const curriculumCounts: Record<string, number> = {};
    schools.forEach((s) => {
      curriculumCounts[s.curriculum] = (curriculumCounts[s.curriculum] || 0) + 1;
    });
    return {
      total: schools.length,
      curricula: Object.keys(curriculumCounts).length,
      cities: availableCities.length,
    };
  }, [availableCities]);

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">
          International Schools in the Netherlands
        </h1>
        <p className="text-muted-foreground text-lg mb-4">
          Find the perfect school for your children. Browse {stats.total}{" "}
          international schools across {stats.cities} cities.
        </p>

        {/* Quick Stats */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="text-sm py-1 px-3">
            {stats.total} Schools
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">
            {stats.curricula} Curricula
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">
            {stats.cities} Cities
          </Badge>
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
                {filteredSchools.length} results
              </span>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <SchoolFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                availableCities={availableCities}
              />
            </div>
          </div>
        </div>

        {/* School Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSchools.length} of {schools.length} schools
            </p>
          </div>

          {filteredSchools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No schools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    search: "",
                    curriculum: [],
                    city: [],
                    grades: [],
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Choosing an International School
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">IB (International Baccalaureate)</h3>
            <p className="text-sm text-muted-foreground">
              The IB curriculum is recognized worldwide and focuses on developing
              well-rounded students. It includes the Primary Years Programme (PYP),
              Middle Years Programme (MYP), and Diploma Programme (DP). The IB
              Diploma is accepted by universities globally.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">British Curriculum</h3>
            <p className="text-sm text-muted-foreground">
              Follows the English National Curriculum leading to IGCSEs and
              A-Levels. Well-suited for families from the UK or planning to
              continue education in British universities. Strong emphasis on
              academic rigor.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">American Curriculum</h3>
            <p className="text-sm text-muted-foreground">
              Based on US educational standards with AP (Advanced Placement)
              courses and SAT preparation. Ideal for families planning to return
              to the US or attend American universities. Often offers the IB
              Diploma as an alternative.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Waiting Lists</h3>
            <p className="text-sm text-muted-foreground">
              Popular international schools often have waiting lists of 6-12
              months or more. Start your application process early, ideally before
              you relocate to the Netherlands. Many schools allow you to apply
              remotely.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto mt-16 text-center p-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-bold mb-3">
          Looking for a Home Near a School?
        </h2>
        <p className="text-muted-foreground mb-6">
          Find properties within easy distance of your preferred international
          school. Our property search lets you filter by school proximity.
        </p>
        <Button asChild size="lg">
          <Link href="/properties">
            Search Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
