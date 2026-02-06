"use client";

import type { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Warm, friendly illustration components
function SearchIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* Magnifying glass */}
      <circle
        cx="85"
        cy="70"
        r="35"
        stroke="currentColor"
        strokeWidth="6"
        className="opacity-80"
      />
      <line
        x1="110"
        y1="95"
        x2="140"
        y2="125"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="opacity-80"
      />
      {/* Decorative dots */}
      <circle cx="75" cy="60" r="4" className="fill-accent-warm opacity-60" />
      <circle cx="95" cy="65" r="3" className="fill-accent-warm opacity-40" />
      <circle cx="80" cy="80" r="3" className="fill-accent-warm opacity-50" />
      {/* Question marks floating */}
      <text
        x="150"
        y="50"
        className="fill-muted-foreground text-2xl opacity-40"
      >
        ?
      </text>
      <text
        x="40"
        y="40"
        className="fill-muted-foreground text-xl opacity-30"
      >
        ?
      </text>
    </svg>
  );
}

function HouseIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* House body */}
      <rect
        x="50"
        y="70"
        width="100"
        height="70"
        rx="4"
        className="fill-secondary stroke-primary"
        strokeWidth="3"
      />
      {/* Roof */}
      <path
        d="M40 75 L100 30 L160 75"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      />
      {/* Door */}
      <rect
        x="85"
        y="100"
        width="30"
        height="40"
        rx="2"
        className="fill-accent-warm opacity-70"
      />
      {/* Windows */}
      <rect
        x="60"
        y="85"
        width="18"
        height="18"
        rx="2"
        className="fill-background stroke-primary"
        strokeWidth="2"
      />
      <rect
        x="122"
        y="85"
        width="18"
        height="18"
        rx="2"
        className="fill-background stroke-primary"
        strokeWidth="2"
      />
      {/* Chimney */}
      <rect
        x="130"
        y="40"
        width="15"
        height="25"
        rx="2"
        className="fill-muted stroke-primary"
        strokeWidth="2"
      />
      {/* Heart on door */}
      <path
        d="M100 115 C97 112 93 114 93 117 C93 120 100 125 100 125 C100 125 107 120 107 117 C107 114 103 112 100 115"
        className="fill-primary-foreground opacity-80"
      />
    </svg>
  );
}

function SchoolIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* Main building */}
      <rect
        x="40"
        y="60"
        width="120"
        height="80"
        rx="4"
        className="fill-secondary stroke-primary"
        strokeWidth="3"
      />
      {/* Central tower */}
      <rect
        x="75"
        y="35"
        width="50"
        height="45"
        rx="2"
        className="fill-muted stroke-primary"
        strokeWidth="3"
      />
      {/* Flag */}
      <line
        x1="100"
        y1="15"
        x2="100"
        y2="35"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M100 15 L120 22 L100 29" className="fill-accent-warm" />
      {/* Clock */}
      <circle
        cx="100"
        cy="50"
        r="10"
        className="fill-background stroke-primary"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="50"
        x2="100"
        y2="44"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="50"
        x2="105"
        y2="50"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Door */}
      <rect
        x="85"
        y="110"
        width="30"
        height="30"
        rx="15"
        className="fill-accent-warm opacity-70"
      />
      {/* Windows */}
      <rect
        x="50"
        y="75"
        width="20"
        height="25"
        rx="2"
        className="fill-background stroke-primary"
        strokeWidth="2"
      />
      <rect
        x="130"
        y="75"
        width="20"
        height="25"
        rx="2"
        className="fill-background stroke-primary"
        strokeWidth="2"
      />
    </svg>
  );
}

function SuccessIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* Checkmark circle */}
      <circle
        cx="100"
        cy="80"
        r="45"
        className="fill-secondary stroke-primary"
        strokeWidth="4"
      />
      {/* Checkmark */}
      <path
        d="M75 80 L90 95 L125 60"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Confetti */}
      <circle cx="45" cy="40" r="4" className="fill-accent-warm" />
      <circle cx="155" cy="45" r="5" className="fill-accent-warm opacity-70" />
      <circle cx="60" cy="130" r="3" className="fill-primary opacity-50" />
      <circle cx="140" cy="125" r="4" className="fill-accent-warm opacity-60" />
      <rect
        x="35"
        y="90"
        width="8"
        height="8"
        rx="1"
        className="fill-primary opacity-40"
        transform="rotate(15 35 90)"
      />
      <rect
        x="160"
        y="85"
        width="6"
        height="6"
        rx="1"
        className="fill-accent-warm opacity-50"
        transform="rotate(-20 160 85)"
      />
    </svg>
  );
}

function ErrorIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-destructive", className)}
    >
      {/* Warning triangle */}
      <path
        d="M100 30 L160 130 L40 130 Z"
        className="fill-destructive/10 stroke-destructive"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Exclamation */}
      <line
        x1="100"
        y1="60"
        x2="100"
        y2="95"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="100" cy="112" r="5" fill="currentColor" />
    </svg>
  );
}

const illustrations = {
  search: SearchIllustration,
  house: HouseIllustration,
  school: SchoolIllustration,
  success: SuccessIllustration,
  error: ErrorIllustration,
};

interface EmptyStateProps {
  illustration?: keyof typeof illustrations;
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  illustration,
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  const IllustrationComponent = illustration
    ? illustrations[illustration]
    : null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-12 text-center",
        "min-h-[280px] sm:min-h-[320px]",
        className
      )}
    >
      {/* Illustration or Icon */}
      {IllustrationComponent ? (
        <IllustrationComponent className="mb-6 h-28 w-28 sm:h-32 sm:w-32" />
      ) : Icon ? (
        <div className="mb-6 rounded-full bg-muted p-4">
          <Icon className="h-10 w-10 text-muted-foreground sm:h-12 sm:w-12" />
        </div>
      ) : null}

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-6 max-w-sm text-sm text-muted-foreground sm:text-base">
        {description}
      </p>

      {/* Actions - stack on mobile */}
      {(action || secondaryAction || children) && (
        <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || "default"}
              size="lg"
              className="w-full min-h-[48px] sm:w-auto sm:min-h-0"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              size="lg"
              className="w-full min-h-[48px] sm:w-auto sm:min-h-0"
            >
              {secondaryAction.label}
            </Button>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
