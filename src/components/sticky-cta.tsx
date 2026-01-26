"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    // Check on initial render (client-side only)
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("sticky-cta-dismissed") === "true";
    }
    return false;
  });

  const handleScroll = useCallback(() => {
    // Show sticky CTA after scrolling past hero (roughly 500px)
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 500);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed, handleScroll]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("sticky-cta-dismissed", "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <>
      {/* Mobile: Bottom sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t shadow-lg p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Ready to find your home?</p>
            <p className="text-xs text-muted-foreground">Free · Takes 3 min</p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link href="/intake">
              Get started
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Desktop: Floating button at bottom right */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button asChild size="lg" className="shadow-lg pr-10">
            <Link href="/intake">
              Check my buying position
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 p-1 bg-background border rounded-full text-muted-foreground hover:text-foreground transition-colors shadow-sm"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </>
  );
}
