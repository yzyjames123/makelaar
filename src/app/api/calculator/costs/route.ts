import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Dutch property buying costs (2024)
const COST_RULES = {
  // Transfer tax rates
  transferTax: {
    firstTimeBuyer: 0, // 0% for first-time buyers under €510k (as of 2024)
    firstTimeBuyerLimit: 510000,
    regular: 0.02, // 2% for regular buyers
    investor: 0.104, // 10.4% for investors/non-occupants
  },
  // NHG
  nhgLimit: 435000,
  nhgFee: 0.006, // 0.6%
  // Typical cost ranges
  notaryDeed: { min: 500, max: 800 },
  mortgageDeed: { min: 700, max: 1200 },
  valuation: { min: 500, max: 800 },
  mortgageAdvisor: { min: 2000, max: 3500 },
  buyersAgent: { minPercent: 0.01, maxPercent: 0.02 }, // 1-2%
  buildingInspection: { min: 300, max: 500 },
  bankGuarantee: { min: 250, max: 500 },
  // Ongoing costs (annual)
  ozb: 0.001, // ~0.1% of WOZ value (varies by municipality)
  insurance: { min: 150, max: 400 }, // Home insurance annual
  vveMin: 50, // Minimum monthly HOA for apartments
  vveMax: 400, // Maximum monthly HOA
};

const calculatorInputSchema = z.object({
  purchasePrice: z.number().min(50000).max(10000000),
  buyerType: z.enum(["first_time", "regular", "investor"]),
  propertyType: z.enum(["house", "apartment", "new_construction"]),
  useBuyersAgent: z.boolean().default(true),
  useNHG: z.boolean().default(false),
  mortgageAmount: z.number().min(0).optional(),
});

export type CostCalculatorInput = z.infer<typeof calculatorInputSchema>;

interface CostItem {
  name: string;
  amount: number;
  description: string;
  isRange?: boolean;
  minAmount?: number;
  maxAmount?: number;
  isOptional?: boolean;
}

export interface CostCalculatorResult {
  // Summary
  totalOneTimeCosts: number;
  totalOneTimeCostsRange: { min: number; max: number };
  monthlyOngoingCosts: number;
  monthlyOngoingCostsRange: { min: number; max: number };
  // Breakdown
  oneTimeCosts: CostItem[];
  ongoingCosts: CostItem[];
  // Context
  nhgEligible: boolean;
  nhgSavings: number | null;
  // Tips
  tips: string[];
}

function calculateCosts(input: CostCalculatorInput): CostCalculatorResult {
  const tips: string[] = [];
  const oneTimeCosts: CostItem[] = [];
  const ongoingCosts: CostItem[] = [];

  // 1. Transfer Tax (Overdrachtsbelasting)
  let transferTaxRate = COST_RULES.transferTax.regular;
  let transferTaxDescription = "2% of purchase price for regular buyers";

  if (input.buyerType === "first_time") {
    if (input.purchasePrice <= COST_RULES.transferTax.firstTimeBuyerLimit) {
      transferTaxRate = COST_RULES.transferTax.firstTimeBuyer;
      transferTaxDescription = `0% for first-time buyers (property under €${COST_RULES.transferTax.firstTimeBuyerLimit.toLocaleString()})`;
      tips.push(
        "Great news! As a first-time buyer with a property under €510k, you pay no transfer tax."
      );
    } else {
      transferTaxDescription = `2% - Property exceeds €${COST_RULES.transferTax.firstTimeBuyerLimit.toLocaleString()} first-time buyer limit`;
      tips.push(
        `Property exceeds €${COST_RULES.transferTax.firstTimeBuyerLimit.toLocaleString()}, so 2% transfer tax applies even for first-time buyers.`
      );
    }
  } else if (input.buyerType === "investor") {
    transferTaxRate = COST_RULES.transferTax.investor;
    transferTaxDescription = "10.4% for investment properties (not owner-occupied)";
    tips.push(
      "Investor properties have higher transfer tax (10.4%). Consider if owner-occupation is an option."
    );
  }

  const transferTaxAmount = Math.round(input.purchasePrice * transferTaxRate);
  oneTimeCosts.push({
    name: "Transfer Tax (Overdrachtsbelasting)",
    amount: transferTaxAmount,
    description: transferTaxDescription,
  });

  // 2. Notary Costs
  const notaryDeedAmount = Math.round(
    (COST_RULES.notaryDeed.min + COST_RULES.notaryDeed.max) / 2
  );
  oneTimeCosts.push({
    name: "Notary - Deed Transfer (Leveringsakte)",
    amount: notaryDeedAmount,
    description: "Legal transfer of property ownership",
    isRange: true,
    minAmount: COST_RULES.notaryDeed.min,
    maxAmount: COST_RULES.notaryDeed.max,
  });

  // 3. Mortgage-related costs (if applicable)
  const mortgageAmount = input.mortgageAmount || input.purchasePrice;

  const mortgageDeedAmount = Math.round(
    (COST_RULES.mortgageDeed.min + COST_RULES.mortgageDeed.max) / 2
  );
  oneTimeCosts.push({
    name: "Notary - Mortgage Deed (Hypotheekakte)",
    amount: mortgageDeedAmount,
    description: "Legal registration of mortgage",
    isRange: true,
    minAmount: COST_RULES.mortgageDeed.min,
    maxAmount: COST_RULES.mortgageDeed.max,
  });

  const valuationAmount = Math.round(
    (COST_RULES.valuation.min + COST_RULES.valuation.max) / 2
  );
  oneTimeCosts.push({
    name: "Property Valuation (Taxatie)",
    amount: valuationAmount,
    description: "Required by bank to confirm property value",
    isRange: true,
    minAmount: COST_RULES.valuation.min,
    maxAmount: COST_RULES.valuation.max,
  });

  // 4. Mortgage Advisor
  const advisorAmount = Math.round(
    (COST_RULES.mortgageAdvisor.min + COST_RULES.mortgageAdvisor.max) / 2
  );
  oneTimeCosts.push({
    name: "Mortgage Advisor (Hypotheekadviseur)",
    amount: advisorAmount,
    description: "Professional advice on mortgage options",
    isRange: true,
    minAmount: COST_RULES.mortgageAdvisor.min,
    maxAmount: COST_RULES.mortgageAdvisor.max,
  });
  tips.push(
    "A mortgage advisor is highly recommended for expats. They understand the Dutch system and can help with 30% ruling considerations."
  );

  // 5. Buyers' Agent (Optional)
  if (input.useBuyersAgent) {
    const buyersAgentMin = Math.round(
      input.purchasePrice * COST_RULES.buyersAgent.minPercent
    );
    const buyersAgentMax = Math.round(
      input.purchasePrice * COST_RULES.buyersAgent.maxPercent
    );
    const buyersAgentAmount = Math.round((buyersAgentMin + buyersAgentMax) / 2);
    oneTimeCosts.push({
      name: "Buyers' Agent (Aankoopmakelaar)",
      amount: buyersAgentAmount,
      description: "1-2% of purchase price - negotiates on your behalf",
      isRange: true,
      minAmount: buyersAgentMin,
      maxAmount: buyersAgentMax,
      isOptional: true,
    });
    tips.push(
      "A buyers' agent is especially valuable for expats unfamiliar with Dutch real estate practices and bidding culture."
    );
  }

  // 6. Building Inspection
  if (input.propertyType !== "new_construction") {
    const inspectionAmount = Math.round(
      (COST_RULES.buildingInspection.min + COST_RULES.buildingInspection.max) / 2
    );
    oneTimeCosts.push({
      name: "Building Inspection (Bouwkundige Keuring)",
      amount: inspectionAmount,
      description: "Professional inspection for defects",
      isRange: true,
      minAmount: COST_RULES.buildingInspection.min,
      maxAmount: COST_RULES.buildingInspection.max,
      isOptional: true,
    });
  } else {
    tips.push(
      "New construction typically includes warranty. Building inspection less critical but pre-delivery inspection recommended."
    );
  }

  // 7. Bank Guarantee
  const bankGuaranteeAmount = Math.round(
    (COST_RULES.bankGuarantee.min + COST_RULES.bankGuarantee.max) / 2
  );
  oneTimeCosts.push({
    name: "Bank Guarantee (Bankgarantie)",
    amount: bankGuaranteeAmount,
    description: "Alternative to 10% deposit for signing",
    isRange: true,
    minAmount: COST_RULES.bankGuarantee.min,
    maxAmount: COST_RULES.bankGuarantee.max,
    isOptional: true,
  });

  // 8. NHG Fee (if applicable)
  const nhgEligible =
    input.purchasePrice <= COST_RULES.nhgLimit && input.buyerType !== "investor";
  let nhgSavings: number | null = null;

  if (nhgEligible && input.useNHG) {
    const nhgFeeAmount = Math.round(mortgageAmount * COST_RULES.nhgFee);
    oneTimeCosts.push({
      name: "NHG Fee (Nationale Hypotheek Garantie)",
      amount: nhgFeeAmount,
      description: "0.6% of mortgage - enables lower interest rates",
    });

    // Calculate estimated savings (0.4% interest savings over 30 years)
    const monthlyRate = 0.004 / 12;
    const months = 30 * 12;
    const monthlySavings =
      mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, months);
    nhgSavings = Math.round(monthlySavings * 0.3); // Rough estimate
    tips.push(
      `NHG can save you €${nhgSavings.toLocaleString()}+ over the mortgage term through lower interest rates.`
    );
  } else if (nhgEligible && !input.useNHG) {
    tips.push(
      `Your property qualifies for NHG (under €${COST_RULES.nhgLimit.toLocaleString()}). Consider using it for lower interest rates.`
    );
  }

  // ONGOING COSTS

  // 1. Property Tax (OZB)
  const ozbAnnual = Math.round(input.purchasePrice * COST_RULES.ozb);
  const ozbMonthly = Math.round(ozbAnnual / 12);
  ongoingCosts.push({
    name: "Property Tax (OZB)",
    amount: ozbMonthly,
    description: `~€${ozbAnnual}/year - varies by municipality`,
  });

  // 2. Home Insurance
  const insuranceAmount = Math.round(
    (COST_RULES.insurance.min + COST_RULES.insurance.max) / 2 / 12
  );
  ongoingCosts.push({
    name: "Home Insurance (Opstalverzekering)",
    amount: insuranceAmount,
    description: "Required by mortgage lender",
    isRange: true,
    minAmount: Math.round(COST_RULES.insurance.min / 12),
    maxAmount: Math.round(COST_RULES.insurance.max / 12),
  });

  // 3. VvE / HOA (for apartments)
  if (input.propertyType === "apartment") {
    const vveAmount = Math.round((COST_RULES.vveMin + COST_RULES.vveMax) / 2);
    ongoingCosts.push({
      name: "VvE / HOA Fees",
      amount: vveAmount,
      description: "Monthly contribution for building maintenance",
      isRange: true,
      minAmount: COST_RULES.vveMin,
      maxAmount: COST_RULES.vveMax,
    });
    tips.push(
      "Always check the VvE (HOA) meeting minutes and financial reserves before buying an apartment."
    );
  }

  // Calculate totals
  const totalOneTimeCosts = oneTimeCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalOneTimeCostsMin = oneTimeCosts.reduce(
    (sum, cost) => sum + (cost.minAmount || cost.amount),
    0
  );
  const totalOneTimeCostsMax = oneTimeCosts.reduce(
    (sum, cost) => sum + (cost.maxAmount || cost.amount),
    0
  );

  const totalMonthlyOngoing = ongoingCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalMonthlyOngoingMin = ongoingCosts.reduce(
    (sum, cost) => sum + (cost.minAmount || cost.amount),
    0
  );
  const totalMonthlyOngoingMax = ongoingCosts.reduce(
    (sum, cost) => sum + (cost.maxAmount || cost.amount),
    0
  );

  return {
    totalOneTimeCosts,
    totalOneTimeCostsRange: {
      min: totalOneTimeCostsMin,
      max: totalOneTimeCostsMax,
    },
    monthlyOngoingCosts: totalMonthlyOngoing,
    monthlyOngoingCostsRange: {
      min: totalMonthlyOngoingMin,
      max: totalMonthlyOngoingMax,
    },
    oneTimeCosts,
    ongoingCosts,
    nhgEligible,
    nhgSavings,
    tips,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const result = calculateCosts(validationResult.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cost calculator error:", error);
    return NextResponse.json(
      { error: "Failed to calculate costs" },
      { status: 500 }
    );
  }
}
