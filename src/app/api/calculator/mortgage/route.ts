import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Dutch mortgage calculation rules (2024)
const MORTGAGE_RULES = {
  // Maximum loan-to-value ratio (can borrow up to 100% of property value)
  maxLTV: 1.0,
  // Base income multiplier for permanent contracts
  baseMultiplier: 4.5,
  // Reduced multiplier for temporary contracts
  temporaryContractMultiplier: 0.8,
  // Self-employed requires 3 years of income history, use conservative estimate
  selfEmployedMultiplier: 0.7,
  // NHG (National Mortgage Guarantee) limit
  nhgLimit: 435000,
  // NHG fee percentage
  nhgFeePercentage: 0.006,
  // Typical mortgage interest rate (for monthly payment calculation)
  interestRate: 0.045, // 4.5%
  // Standard mortgage term in years
  mortgageTermYears: 30,
};

const calculatorInputSchema = z.object({
  grossAnnualSalary: z.number().min(0).max(10000000),
  has30PercentRuling: z.boolean().default(false),
  contractType: z.enum(["permanent", "temporary", "self_employed"]),
  partnerIncome: z.number().min(0).max(10000000).optional(),
  downPayment: z.number().min(0).max(10000000).optional(),
});

export type MortgageCalculatorInput = z.infer<typeof calculatorInputSchema>;

export interface MortgageCalculatorResult {
  // Core results
  maxMortgage: number;
  maxPropertyPrice: number;
  monthlyPayment: number;
  // Breakdown
  effectiveIncome: number;
  incomeMultiplier: number;
  // NHG eligibility
  nhgEligible: boolean;
  nhgFee: number | null;
  // Scenarios for comparison
  scenarios: {
    with30PercentRuling: number;
    without30PercentRuling: number;
    withPartner: number | null;
  };
  // Warnings
  warnings: string[];
}

function calculateMaxMortgage(input: MortgageCalculatorInput): MortgageCalculatorResult {
  const warnings: string[] = [];

  // Calculate effective income based on 30% ruling
  let effectiveIncome = input.grossAnnualSalary;

  if (input.has30PercentRuling) {
    // 30% ruling means 30% of salary is tax-free
    // This effectively increases net income, which banks consider
    // Simplified: treat it as ~15-20% increase in borrowing capacity
    effectiveIncome = effectiveIncome * 1.15;
  }

  // Add partner income if present (typically counted at lower rate)
  let partnerContribution = 0;
  if (input.partnerIncome && input.partnerIncome > 0) {
    // Partner income typically counted at 90%
    partnerContribution = input.partnerIncome * 0.9;
    effectiveIncome += partnerContribution;
  }

  // Apply contract type multiplier
  let incomeMultiplier = MORTGAGE_RULES.baseMultiplier;

  switch (input.contractType) {
    case "temporary":
      incomeMultiplier *= MORTGAGE_RULES.temporaryContractMultiplier;
      warnings.push(
        "Temporary contracts typically reduce borrowing capacity by 20%. Consider converting to permanent for better rates."
      );
      break;
    case "self_employed":
      incomeMultiplier *= MORTGAGE_RULES.selfEmployedMultiplier;
      warnings.push(
        "Self-employed borrowers need 3 years of income history. Banks use average of last 3 years."
      );
      break;
  }

  // Calculate max mortgage
  const maxMortgage = Math.round(effectiveIncome * incomeMultiplier);

  // Calculate max property price (mortgage + down payment)
  const downPayment = input.downPayment || 0;
  const maxPropertyPrice = maxMortgage + downPayment;

  // Check NHG eligibility
  const nhgEligible = maxPropertyPrice <= MORTGAGE_RULES.nhgLimit;
  const nhgFee = nhgEligible
    ? Math.round(maxMortgage * MORTGAGE_RULES.nhgFeePercentage)
    : null;

  if (nhgEligible) {
    warnings.push(
      `Property qualifies for NHG (National Mortgage Guarantee), which can lower interest rates by 0.3-0.5%. Fee: €${nhgFee?.toLocaleString()}`
    );
  }

  // Calculate monthly payment (annuity mortgage)
  const monthlyInterestRate = MORTGAGE_RULES.interestRate / 12;
  const numberOfPayments = MORTGAGE_RULES.mortgageTermYears * 12;
  const monthlyPayment = Math.round(
    (maxMortgage *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  );

  // Calculate scenarios for comparison
  const scenarios = {
    // With 30% ruling (if they don't have it)
    with30PercentRuling: input.has30PercentRuling
      ? maxMortgage
      : Math.round(input.grossAnnualSalary * 1.15 * incomeMultiplier),

    // Without 30% ruling (if they have it)
    without30PercentRuling: input.has30PercentRuling
      ? Math.round(
          (input.grossAnnualSalary + partnerContribution) * incomeMultiplier
        )
      : maxMortgage,

    // With partner (if they don't have one)
    withPartner:
      input.partnerIncome && input.partnerIncome > 0
        ? null
        : Math.round(
            (effectiveIncome + 50000 * 0.9) * incomeMultiplier // Assume €50k partner salary
          ),
  };

  return {
    maxMortgage,
    maxPropertyPrice,
    monthlyPayment,
    effectiveIncome: Math.round(effectiveIncome),
    incomeMultiplier,
    nhgEligible,
    nhgFee,
    scenarios,
    warnings,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = calculatorInputSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = calculateMaxMortgage(validationResult.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Mortgage calculator error:", error);
    return NextResponse.json(
      { error: "Failed to calculate mortgage" },
      { status: 500 }
    );
  }
}
