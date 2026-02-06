"use client";

import {
  Euro,
  Calendar,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CostItem {
  name: string;
  amount: number;
  description: string;
  isRange?: boolean;
  minAmount?: number;
  maxAmount?: number;
  isOptional?: boolean;
}

export interface CostResult {
  totalOneTimeCosts: number;
  totalOneTimeCostsRange: { min: number; max: number };
  monthlyOngoingCosts: number;
  monthlyOngoingCostsRange: { min: number; max: number };
  oneTimeCosts: CostItem[];
  ongoingCosts: CostItem[];
  nhgEligible: boolean;
  nhgSavings: number | null;
  tips: string[];
}

interface CostBreakdownProps {
  result: CostResult;
  purchasePrice: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function CostItemRow({ item }: { item: CostItem }) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{item.name}</p>
          {item.isOptional && (
            <Badge variant="outline" className="text-xs">
              Optional
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
      </div>
      <div className="text-right ml-4">
        <p className="font-semibold">{formatCurrency(item.amount)}</p>
        {item.isRange && item.minAmount && item.maxAmount && (
          <p className="text-xs text-muted-foreground">
            {formatCurrency(item.minAmount)} - {formatCurrency(item.maxAmount)}
          </p>
        )}
      </div>
    </div>
  );
}

export function CostBreakdown({ result, purchasePrice }: CostBreakdownProps) {
  const percentOfPrice = (
    (result.totalOneTimeCosts / purchasePrice) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Euro className="h-4 w-4" />
              <span className="text-sm">One-Time Costs</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(result.totalOneTimeCosts)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(result.totalOneTimeCostsRange.min)} -{" "}
              {formatCurrency(result.totalOneTimeCostsRange.max)}
            </p>
            <Badge variant="secondary" className="mt-2">
              {percentOfPrice}% of price
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Monthly Costs</span>
            </div>
            <p className="text-2xl font-bold">
              {formatCurrency(result.monthlyOngoingCosts)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(result.monthlyOngoingCostsRange.min)} -{" "}
              {formatCurrency(result.monthlyOngoingCostsRange.max)}
            </p>
            <Badge variant="outline" className="mt-2">
              Excl. mortgage
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* NHG Status */}
      {result.nhgEligible && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-green-600 dark:text-green-400">
                  NHG Eligible
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your property qualifies for NHG. This can reduce your interest
                  rate by 0.3-0.5%.
                  {result.nhgSavings && (
                    <span className="block mt-1">
                      Estimated lifetime savings:{" "}
                      <strong>{formatCurrency(result.nhgSavings)}+</strong>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* One-Time Costs Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">One-Time Costs</CardTitle>
          <CardDescription>
            Costs payable at purchase completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {result.oneTimeCosts.map((item, index) => (
              <CostItemRow key={index} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t-2">
            <p className="font-semibold">Total One-Time Costs</p>
            <p className="text-xl font-bold text-primary">
              {formatCurrency(result.totalOneTimeCosts)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ongoing Costs Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Ongoing Costs</CardTitle>
          <CardDescription>
            Recurring costs (excluding mortgage payment)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {result.ongoingCosts.map((item, index) => (
              <CostItemRow key={index} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t-2">
            <p className="font-semibold">Total Monthly Costs</p>
            <p className="text-xl font-bold">
              {formatCurrency(result.monthlyOngoingCosts)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      {result.tips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Tips for Expats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* What's Not Included */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Not Included in This Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Mortgage payments (use our Mortgage Calculator)</li>
            <li>• Moving costs</li>
            <li>• Furniture and appliances</li>
            <li>• Renovation or repair costs</li>
            <li>• Utility connection fees (gas, electricity, water)</li>
            <li>• Internet/TV setup</li>
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
        <p>
          <strong>Disclaimer:</strong> These estimates are based on typical costs
          in the Dutch real estate market. Actual costs may vary based on your
          specific situation, location, and service providers. Always request
          quotes from professionals for accurate figures.
        </p>
      </div>
    </div>
  );
}
