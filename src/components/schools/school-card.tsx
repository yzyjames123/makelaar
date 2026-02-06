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

function getCurriculumColor(curriculum: string): string {
  const colors: Record<string, string> = {
    IB: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    British: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    American: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    French: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    German: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    European: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };
  return colors[curriculum] || "bg-gray-100 text-gray-800";
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{school.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {school.city}
            </CardDescription>
          </div>
          <Badge className={getCurriculumColor(school.curriculum)}>
            {school.curriculum}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {school.description}
        </p>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Euro className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatCurrency(school.tuitionAnnual)}
              {school.tuitionAnnual > 0 && <span className="text-muted-foreground">/yr</span>}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {school.waitingListMonths > 0
                ? `${school.waitingListMonths}mo wait`
                : "No wait"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm col-span-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{school.grades.join(", ")}</span>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1 mb-4">
          {school.languages.map((lang) => (
            <Badge key={lang} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>

        {/* Address */}
        <p className="text-xs text-muted-foreground mb-4">{school.address}</p>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={school.website} target="_blank" rel="noopener noreferrer">
              <Globe className="h-3 w-3 mr-1" />
              Website
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${school.email}`}>
              <Mail className="h-3 w-3" />
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`tel:${school.phone}`}>
              <Phone className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
