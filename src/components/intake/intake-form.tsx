"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

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
