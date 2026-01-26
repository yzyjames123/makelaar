"use client";

import { useState } from "react";
import { ChevronRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { QuickIntakeFormData } from "./intake-form";

interface StepRegionBudgetProps {
  formData: QuickIntakeFormData;
  updateFormData: (updates: Partial<QuickIntakeFormData>) => void;
  onNext: () => void;
}

const regions = [
  { value: "amsterdam", label: "Amsterdam region" },
  { value: "rotterdam", label: "Rotterdam region" },
  { value: "the-hague", label: "The Hague region" },
  { value: "utrecht", label: "Utrecht region" },
  { value: "noord-brabant", label: "Noord-Brabant" },
  { value: "other", label: "Other region" },
];

const budgetRanges = [
  { value: "up-to-300", label: "Up to \u20AC300,000" },
  { value: "300-450", label: "\u20AC300,000 \u2013 \u20AC450,000" },
  { value: "450-600", label: "\u20AC450,000 \u2013 \u20AC600,000" },
  { value: "600-800", label: "\u20AC600,000 \u2013 \u20AC800,000" },
  { value: "800-1000", label: "\u20AC800,000 \u2013 \u20AC1,000,000" },
  { value: "1000+", label: "\u20AC1,000,000+" },
];

export function StepRegionBudget({
  formData,
  updateFormData,
  onNext,
}: StepRegionBudgetProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleRegion = (region: string) => {
    const current = formData.preferredRegions;
    updateFormData({
      preferredRegions: current.includes(region)
        ? current.filter((r) => r !== region)
        : [...current, region],
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.preferredRegions.length === 0) {
      newErrors.preferredRegions = "Please select at least one region";
    }
    if (!formData.budgetRange) {
      newErrors.budgetRange = "Please select your budget range";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Where do you want to live?
        </CardTitle>
        <CardDescription>
          Select your preferred regions and we&apos;ll connect you with local
          experts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="your@email.com"
            className="h-12"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Regions - prominent multi-select */}
        <div className="space-y-3">
          <Label>Preferred regions * (select all that apply)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {regions.map((region) => {
              const isSelected = formData.preferredRegions.includes(
                region.value
              );
              return (
                <button
                  key={region.value}
                  type="button"
                  onClick={() => toggleRegion(region.value)}
                  className={cn(
                    "flex items-center justify-between gap-3 p-4 border-2 rounded-lg transition-all text-left",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <span className="font-medium">{region.label}</span>
                  {isSelected && <Check className="h-5 w-5 text-primary" />}
                </button>
              );
            })}
          </div>
          {errors.preferredRegions && (
            <p className="text-sm text-destructive">{errors.preferredRegions}</p>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget range *</Label>
          <select
            id="budgetRange"
            value={formData.budgetRange}
            onChange={(e) => updateFormData({ budgetRange: e.target.value })}
            className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
            aria-invalid={!!errors.budgetRange}
          >
            <option value="">Select your budget range</option>
            {budgetRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p className="text-sm text-destructive">{errors.budgetRange}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} size="lg">
            Continue
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
