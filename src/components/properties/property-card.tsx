"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Ruler,
  Calendar,
  Zap,
  ExternalLink,
  Heart,
  Home,
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

export interface Property {
  id: string;
  externalId: string | null;
  source: string;
  url: string;
  title: string;
  description: string | null;
  price: number;
  pricePerSqm: number | null;
  address: string;
  city: string;
  postcode: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  livingAreaSqm: number | null;
  plotAreaSqm: number | null;
  propertyType: string | null;
  yearBuilt: number | null;
  energyLabel: string | null;
  photos: string[] | null;
  status: string | null;
  listedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface PropertyCardProps {
  property: Property;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getEnergyLabelColor(label: string): string {
  const colors: Record<string, string> = {
    A: "bg-green-500 text-white",
    "A+": "bg-green-600 text-white",
    "A++": "bg-green-700 text-white",
    B: "bg-lime-500 text-white",
    C: "bg-yellow-500 text-black",
    D: "bg-orange-400 text-black",
    E: "bg-orange-500 text-white",
    F: "bg-red-500 text-white",
    G: "bg-red-700 text-white",
  };
  return colors[label.toUpperCase()] || "bg-gray-400 text-white";
}

function getSourceBadge(source: string): { label: string; color: string } {
  const sources: Record<string, { label: string; color: string }> = {
    jaap: { label: "Jaap.nl", color: "bg-blue-100 text-blue-800" },
    funda: { label: "Funda", color: "bg-orange-100 text-orange-800" },
    pararius: { label: "Pararius", color: "bg-purple-100 text-purple-800" },
  };
  return sources[source] || { label: source, color: "bg-gray-100 text-gray-800" };
}

export function PropertyCard({ property, onSave, isSaved = false }: PropertyCardProps) {
  const sourceBadge = getSourceBadge(property.source);
  const mainPhoto = property.photos?.[0];

  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.01]">
      {/* Photo - taller on mobile for better visuals */}
      <div className="relative h-52 sm:h-48 bg-gradient-to-br from-muted to-muted/50">
        {mainPhoto ? (
          <Image
            src={mainPhoto}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <Home className="h-14 w-14 text-primary/40 mb-2" />
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        )}
        {/* Price Pill - warmer design */}
        <div className="absolute bottom-3 left-3">
          <div className="rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-sm px-4 py-2 shadow-lg">
            <p className="font-bold text-lg text-foreground">{formatPrice(property.price)}</p>
            {property.pricePerSqm && (
              <p className="text-xs text-muted-foreground -mt-0.5">
                {formatPrice(property.pricePerSqm)}/m²
              </p>
            )}
          </div>
        </div>
        {/* Source Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={cn(sourceBadge.color, "shadow-sm")}>{sourceBadge.label}</Badge>
        </div>
        {/* Save Button - larger touch target on mobile */}
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-3 right-3 min-h-[44px] min-w-[44px] rounded-full",
              "bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm",
              "transition-transform active:scale-95"
            )}
            onClick={() => onSave(property.id)}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isSaved ? "fill-accent-warm text-accent-warm" : "text-muted-foreground"
              )}
            />
          </Button>
        )}
      </div>

      <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
        <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2 sm:line-clamp-1">
          {property.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{property.address}, {property.city}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-4 sm:px-6 pb-4 sm:pb-6">
        {/* Property Details Grid - better spacing on mobile */}
        <div className="grid grid-cols-3 gap-3 mb-4 py-3 px-3 bg-muted/30 rounded-lg">
          {property.bedrooms && (
            <div className="flex flex-col items-center text-center">
              <Bed className="h-4 w-4 text-primary mb-1" />
              <span className="text-sm font-medium">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground">beds</span>
            </div>
          )}
          {property.livingAreaSqm && (
            <div className="flex flex-col items-center text-center">
              <Ruler className="h-4 w-4 text-primary mb-1" />
              <span className="text-sm font-medium">{property.livingAreaSqm}</span>
              <span className="text-xs text-muted-foreground">m²</span>
            </div>
          )}
          {property.energyLabel && (
            <div className="flex flex-col items-center text-center">
              <Zap className="h-4 w-4 text-primary mb-1" />
              <Badge className={cn(getEnergyLabelColor(property.energyLabel), "px-2 py-0.5 text-xs")}>
                {property.energyLabel}
              </Badge>
            </div>
          )}
        </div>

        {/* Year Built - if no other details show */}
        {property.yearBuilt && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4" />
            <span>Built {property.yearBuilt}</span>
          </div>
        )}

        {/* Description Preview */}
        {property.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {property.description}
          </p>
        )}

        {/* Action Buttons - full width stacked on mobile, side by side on desktop */}
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Button
            variant="default"
            className="flex-1 min-h-[48px] sm:min-h-0"
            asChild
          >
            <Link href={`/properties/${property.id}`}>
              View Details
            </Link>
          </Button>
          <Button
            variant="outline"
            className="min-h-[48px] sm:min-h-0 sm:w-auto"
            asChild
          >
            <a href={property.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2 sm:mr-0" />
              <span className="sm:hidden">View on {sourceBadge.label}</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
