import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { intakeProfiles } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isQuickIntake = body.intakeType === "quick";

    // Different validation for quick vs full intake
    const requiredFields = isQuickIntake
      ? [
          "email",
          "preferredRegions",
          "budgetRange",
          "purchaseTimeline",
          "consentToShare",
        ]
      : [
          "firstName",
          "lastName",
          "email",
          "nationality",
          "currentLocation",
          "employmentType",
          "annualIncome",
          "hasPartner",
          "budgetRange",
          "hasSavings",
          "preferredRegions",
          "propertyTypes",
          "purchaseTimeline",
          "hasStartedViewing",
          "hasMortgageAdvisor",
          "consentToShare",
        ];

    for (const field of requiredFields) {
      if (
        body[field] === undefined ||
        body[field] === "" ||
        (Array.isArray(body[field]) && body[field].length === 0)
      ) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert into database with nullable fields for quick intake
    const result = await db
      .insert(intakeProfiles)
      .values({
        // Core fields (required for quick intake)
        email: body.email,
        preferredRegions: body.preferredRegions,
        budgetRange: body.budgetRange,
        purchaseTimeline: body.purchaseTimeline,
        consentToShare: body.consentToShare,
        marketingConsent: body.marketingConsent || false,
        intakeType: isQuickIntake ? "quick" : "full",
        status: "pending",
        // Deferred fields (nullable - only set if provided)
        firstName: body.firstName || null,
        lastName: body.lastName || null,
        phone: body.phone || null,
        nationality: body.nationality || null,
        currentLocation: body.currentLocation || null,
        expectedMoveDate: body.expectedMoveDate || null,
        employmentType: body.employmentType || null,
        annualIncome: body.annualIncome || null,
        hasPartner:
          body.hasPartner !== undefined
            ? body.hasPartner === "yes" || body.hasPartner === true
            : null,
        partnerEmploymentType: body.partnerEmploymentType || null,
        partnerIncome: body.partnerIncome || null,
        hasSavings:
          body.hasSavings !== undefined
            ? body.hasSavings === "yes" || body.hasSavings === true
            : null,
        propertyTypes: body.propertyTypes || null,
        hasStartedViewing:
          body.hasStartedViewing !== undefined
            ? body.hasStartedViewing === "yes" || body.hasStartedViewing === true
            : null,
        hasMortgageAdvisor: body.hasMortgageAdvisor || null,
      })
      .returning({ id: intakeProfiles.id });

    return NextResponse.json(
      { success: true, id: result[0]?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating intake profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
