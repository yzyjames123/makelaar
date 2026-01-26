"use client";

import { useState } from "react";
import { ChevronLeft, Check, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { QuickIntakeFormData } from "./intake-form";

interface StepTimelineConsentProps {
  formData: QuickIntakeFormData;
  updateFormData: (updates: Partial<QuickIntakeFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const timelineOptions = [
  {
    value: "asap",
    label: "As soon as possible",
    description: "Ready to start now",
  },
  {
    value: "3-months",
    label: "Within 3 months",
    description: "Actively searching",
  },
  {
    value: "6-months",
    label: "Within 6 months",
    description: "Planning ahead",
  },
  {
    value: "exploring",
    label: "Just exploring",
    description: "Gathering information",
  },
];

export function StepTimelineConsent({
  formData,
  updateFormData,
  onBack,
  onSubmit,
  isSubmitting,
}: StepTimelineConsentProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.purchaseTimeline) {
      newErrors.purchaseTimeline = "Please select your timeline";
    }
    if (!formData.consentToShare) {
      newErrors.consentToShare = "Please agree to continue";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          When do you want to buy?
        </CardTitle>
        <CardDescription>
          This helps us match you with agents available for your timeline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline */}
        <div className="space-y-3">
          <Label>Purchase timeline *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {timelineOptions.map((option) => {
              const isSelected = formData.purchaseTimeline === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    updateFormData({ purchaseTimeline: option.value })
                  }
                  className={cn(
                    "flex flex-col items-start gap-1 p-4 border-2 rounded-lg transition-all text-left",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.purchaseTimeline && (
            <p className="text-sm text-destructive">{errors.purchaseTimeline}</p>
          )}
        </div>

        {/* Consent - simplified to single checkbox */}
        <div className="space-y-4 pt-4 border-t">
          <label
            className={cn(
              "flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all",
              formData.consentToShare
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50",
              errors.consentToShare && "border-destructive"
            )}
          >
            <input
              type="checkbox"
              checked={formData.consentToShare}
              onChange={(e) =>
                updateFormData({ consentToShare: e.target.checked })
              }
              className="mt-1 h-4 w-4"
            />
            <div>
              <span className="font-medium">
                I agree to be contacted by local buyers&apos; agents *
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                Only agents in your selected regions who can help will receive
                your email. Free service, no obligation.
              </p>
            </div>
          </label>
          {errors.consentToShare && (
            <p className="text-sm text-destructive">{errors.consentToShare}</p>
          )}

          {/* Optional marketing consent */}
          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={(e) =>
                updateFormData({ marketingConsent: e.target.checked })
              }
              className="mt-1 h-4 w-4"
            />
            <span className="text-sm text-muted-foreground">
              Send me occasional tips about buying property in the Netherlands
            </span>
          </label>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get matched with experts
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
