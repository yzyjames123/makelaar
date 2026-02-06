"use client";

import {
  MapPin,
  Euro,
  Globe,
  Phone,
  Mail,
  Clock,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface School {
  id: string;
  name: string;
  curriculum: string;
  grades: string[];
  address: string;
  city: string;
  postcode: string;
  latitude: number;
  longitude: number;
  tuitionAnnual: number;
  website: string;
  phone: string;
  email: string;
  waitingListMonths: number;
  languages: string[];
  description: string;
}

interface SchoolCardProps {
  school: School;
}

function formatCurrency(amount: number): string {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getCurriculumStyle(curriculum: string): { color: string; emoji: string } {
  const styles: Record<string, { color: string; emoji: string }> = {
    IB: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800",
      emoji: "🌍",
    },
    British: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800",
      emoji: "🇬🇧",
    },
    American: {
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800",
      emoji: "🇺🇸",
    },
    French: {
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800",
      emoji: "🇫🇷",
    },
    German: {
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800",
      emoji: "🇩🇪",
    },
    European: {
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
      emoji: "🇪🇺",
    },
  };
  return styles[curriculum] || { color: "bg-gray-100 text-gray-800", emoji: "📚" };
}

export function SchoolCard({ school }: SchoolCardProps) {
  const curriculumStyle = getCurriculumStyle(school.curriculum);

  return (
    <Card className="group h-full flex flex-col transition-all duration-300 hover:scale-[1.01]">
      {/* Header with curriculum accent */}
      <div className={cn("h-2 rounded-t-xl", curriculumStyle.color.split(" ")[0])} />

      <CardHeader className="pb-3 px-4 sm:px-6 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2">
              {school.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1.5 text-sm">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{school.city}</span>
            </CardDescription>
          </div>
          <Badge className={cn(curriculumStyle.color, "border flex-shrink-0 gap-1")}>
            <span>{curriculumStyle.emoji}</span>
            <span className="hidden sm:inline">{school.curriculum}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-4 sm:px-6 pb-4 sm:pb-6">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {school.description}
        </p>

        {/* Key Info Grid - better spacing on mobile */}
        <div className="grid grid-cols-2 gap-3 mb-4 py-3 px-3 bg-muted/30 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Euro className="h-4 w-4 text-primary" />
              <span>
                {formatCurrency(school.tuitionAnnual)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground ml-6">
              {school.tuitionAnnual > 0 ? "per year" : "tuition"}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-primary" />
              <span>
                {school.waitingListMonths > 0
                  ? `${school.waitingListMonths} months`
                  : "No wait"}
              </span>
            </div>
            <span className="text-xs text-muted-foreground ml-6">
              waiting list
            </span>
          </div>
          <div className="col-span-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Grades:</span>
              <span className="font-medium truncate">{school.grades.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {school.languages.map((lang) => (
            <Badge
              key={lang}
              variant="outline"
              className="text-xs px-2 py-0.5"
            >
              {lang}
            </Badge>
          ))}
        </div>

        {/* Address */}
        <p className="text-xs text-muted-foreground mb-4 flex items-start gap-1.5">
          <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
          <span>{school.address}, {school.postcode}</span>
        </p>

        {/* Action Buttons - stacked on mobile for better touch targets */}
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Button
            variant="default"
            className="flex-1 min-h-[48px] sm:min-h-0"
            asChild
          >
            <a href={school.website} target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
            </a>
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none min-h-[48px] sm:min-h-0"
              asChild
            >
              <a href={`mailto:${school.email}`} aria-label="Send email">
                <Mail className="h-4 w-4 sm:mr-0 mr-2" />
                <span className="sm:hidden">Email</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none min-h-[48px] sm:min-h-0"
              asChild
            >
              <a href={`tel:${school.phone}`} aria-label="Call school">
                <Phone className="h-4 w-4 sm:mr-0 mr-2" />
                <span className="sm:hidden">Call</span>
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
