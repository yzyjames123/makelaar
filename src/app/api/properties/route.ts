import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { propertyService } from "@/lib/services/property-service";

const searchParamsSchema = z.object({
  city: z.string().nullable().default(null),
  minPrice: z.coerce.number().nullable().default(null),
  maxPrice: z.coerce.number().nullable().default(null),
  minBedrooms: z.coerce.number().nullable().default(null),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

/**
 * GET /api/properties
 * List properties with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = searchParamsSchema.safeParse({
      city: searchParams.get("city"),
      minPrice: searchParams.get("minPrice"),
      maxPrice: searchParams.get("maxPrice"),
      minBedrooms: searchParams.get("minBedrooms"),
      limit: searchParams.get("limit") || undefined,
      offset: searchParams.get("offset") || undefined,
    });

    if (!params.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: params.error.flatten() },
        { status: 400 }
      );
    }

    const properties = await propertyService.getProperties(params.data);
    const cities = await propertyService.getCities();
    const stats = await propertyService.getStats();

    return NextResponse.json({
      properties,
      pagination: {
        limit: params.data.limit,
        offset: params.data.offset,
        total: stats.active,
      },
      filters: {
        cities,
      },
    });
  } catch (error) {
    console.error("[Properties API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
