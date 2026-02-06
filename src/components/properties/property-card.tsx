"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Ruler, Calendar, Zap, ExternalLink, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {/* Photo */}
      <div className="relative h-48 bg-muted">
        {mainPhoto ? (
          <Image
            src={mainPhoto}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white font-bold text-xl">{formatPrice(property.price)}</p>
          {property.pricePerSqm && (
            <p className="text-white/80 text-sm">
              {formatPrice(property.pricePerSqm)}/m²
            </p>
          )}
        </div>
        {/* Source Badge */}
        <div className="absolute top-2 left-2">
          <Badge className={sourceBadge.color}>{sourceBadge.label}</Badge>
        </div>
        {/* Save Button */}
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => onSave(property.id)}
          >
            <Heart
              className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg leading-tight line-clamp-1">
          {property.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {property.address}, {property.city}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Property Details Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {property.bedrooms && (
            <div className="flex items-center gap-1 text-sm">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.livingAreaSqm && (
            <div className="flex items-center gap-1 text-sm">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span>{property.livingAreaSqm}m²</span>
            </div>
          )}
          {property.energyLabel && (
            <div className="flex items-center gap-1 text-sm">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <Badge className={`${getEnergyLabelColor(property.energyLabel)} px-1.5 py-0 text-xs`}>
                {property.energyLabel}
              </Badge>
            </div>
          )}
          {property.yearBuilt && (
            <div className="flex items-center gap-1 text-sm col-span-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Built {property.yearBuilt}</span>
            </div>
          )}
        </div>

        {/* Description Preview */}
        {property.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {property.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <Button variant="default" size="sm" className="flex-1" asChild>
            <Link href={`/properties/${property.id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={property.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
