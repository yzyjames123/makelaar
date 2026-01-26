"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { ProgressBar } from "./progress-bar";
import { StepRegionBudget } from "./step-region-budget";
import { StepTimelineConsent } from "./step-timeline-consent";

export type QuickIntakeFormData = {
  email: string;
  preferredRegions: string[];
  budgetRange: string;
  purchaseTimeline: string;
  consentToShare: boolean;
  marketingConsent: boolean;
};

const initialFormData: QuickIntakeFormData = {
  email: "",
  preferredRegions: [],
  budgetRange: "",
  purchaseTimeline: "",
  consentToShare: false,
  marketingConsent: false,
};

const TOTAL_STEPS = 2;

export function IntakeForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuickIntakeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill from URL params (from hero form)
  useEffect(() => {
    const email = searchParams.get("email");
    const regions = searchParams.get("regions");

    const updates: Partial<QuickIntakeFormData> = {};
    if (email) updates.email = decodeURIComponent(email);
    if (regions) updates.preferredRegions = regions.split(",");

    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }));
    }
  }, [searchParams]);

  const updateFormData = (updates: Partial<QuickIntakeFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    if (error) setError(null);
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          intakeType: "quick",
        }),
      });

      if (response.ok) {
        router.push("/intake/confirmation");
      } else {
        const data = await response.json().catch(() => ({}));
        const errorMessage = data.error || "Failed to submit form. Please try again.";
        setError(errorMessage);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {currentStep === 1 && (
        <StepRegionBudget
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
        />
      )}

      {currentStep === 2 && (
        <StepTimelineConsent
          formData={formData}
          updateFormData={updateFormData}
          onBack={prevStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
