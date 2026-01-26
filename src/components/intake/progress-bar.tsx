"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Location & Budget", "Submit"];

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-8">
      {/* Step indicator text */}
      <p className="text-sm text-muted-foreground text-center mb-4">
        Step {currentStep} of {totalSteps}
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex-1 flex items-center">
            <div
              className={cn(
                "h-2 w-full rounded-full transition-colors",
                step < currentStep && "bg-primary",
                step === currentStep && "bg-primary",
                step > currentStep && "bg-muted"
              )}
            />
          </div>
        ))}
      </div>

      {/* Step labels on larger screens */}
      <div className="hidden md:flex justify-between mt-2">
        {stepLabels.map((label, index) => (
          <span
            key={label}
            className={cn(
              "text-xs transition-colors",
              index + 1 <= currentStep
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
