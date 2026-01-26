"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const regions = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "rotterdam", label: "Rotterdam" },
  { value: "the-hague", label: "The Hague" },
  { value: "utrecht", label: "Utrecht" },
  { value: "noord-brabant", label: "Noord-Brabant" },
  { value: "other", label: "Other" },
];

export function HeroEmailForm() {
  const [email, setEmail] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const router = useRouter();

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || selectedRegions.length === 0) return;

    const params = new URLSearchParams({
      email: email.trim(),
      regions: selectedRegions.join(","),
    });
    router.push(`/onboarding?${params.toString()}`);
  };

  const isValid = email.trim() && selectedRegions.length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      {/* Region selection - prominent, first */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2 justify-center">
          <MapPin className="h-4 w-4" />
          Where do you want to live?
        </label>
        <div className="flex flex-wrap gap-2 justify-center">
          {regions.map((region) => {
            const isSelected = selectedRegions.includes(region.value);
            return (
              <button
                key={region.value}
                type="button"
                onClick={() => toggleRegion(region.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                )}
              >
                {region.label}
                {isSelected && <Check className="inline ml-1 h-3 w-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Email + Submit row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 text-base"
          required
        />
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 text-base"
          disabled={!isValid}
        >
          Find local experts
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
