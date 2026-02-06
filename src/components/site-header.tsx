"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Calculator,
  GraduationCap,
  Building2,
  ChevronDown,
  Menu,
  ArrowRight,
  Globe,
} from "lucide-react";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const toolsLinks = [
  {
    href: "/calculator/mortgage",
    label: "Mortgage Calculator",
    description: "Calculate your borrowing power",
    icon: Calculator,
  },
  {
    href: "/calculator/costs",
    label: "Cost Calculator",
    description: "Estimate total buying costs",
    icon: Calculator,
  },
  {
    href: "/schools",
    label: "School Finder",
    description: "Find international schools",
    icon: GraduationCap,
  },
  {
    href: "/properties",
    label: "Property Search",
    description: "Browse available homes",
    icon: Building2,
  },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
        <nav
          className="container mx-auto px-4 py-3 flex justify-between items-center"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">
              <Link
                href="/"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                aria-label="Makelaar Match - Go to homepage"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10"
                  aria-hidden="true"
                >
                  <Home className="h-5 w-5" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Makelaar Match
                </span>
              </Link>
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Tools
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuLabel>Free Tools for Expats</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {toolsLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-start gap-3 py-2">
                        <link.icon className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <div className="font-medium">{link.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* How It Works Link */}
              <Button variant="ghost" asChild>
                <Link href="/#how-it-works">How It Works</Link>
              </Button>

              {/* Get Started Link */}
              <Button asChild>
                <Link href="/intake">
                  Find Your Home
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2" role="group" aria-label="User actions">
            {/* Language indicator */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
              <Globe className="h-3 w-3" />
              <span>EN</span>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  {/* Tools Section */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Free Tools
                    </h3>
                    <div className="flex flex-col gap-1">
                      {toolsLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors"
                        >
                          <link.icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-sm">{link.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t" />

                  {/* How It Works */}
                  <Link
                    href="/#how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors text-muted-foreground"
                  >
                    How It Works
                  </Link>

                  {/* Get Started CTA */}
                  <Button asChild className="w-full">
                    <Link
                      href="/intake"
                      onClick={() => setMobileMenuOpen(false)}
                      className="gap-2"
                    >
                      Find Your Home
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <ModeToggle />
            <UserProfile />
          </div>
        </nav>
      </header>
    </>
  );
}
