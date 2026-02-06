"use client";

import {
  Home,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
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

export interface MortgageResult {
  maxMortgage: number;
  maxPropertyPrice: number;
  monthlyPayment: number;
  effectiveIncome: number;
  incomeMultiplier: number;
  nhgEligible: boolean;
  nhgFee: number | null;
  scenarios: {
    with30PercentRuling: number;
    without30PercentRuling: number;
    withPartner: number | null;
  };
  warnings: string[];
}

interface MortgageResultsProps {
  result: MortgageResult;
  has30PercentRuling: boolean;
  hasPartner: boolean;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function MortgageResults({
  result,
  has30PercentRuling,
  hasPartner,
}: MortgageResultsProps) {
  return (
    <div className="space-y-6">
      {/* Main Results */}
      <Card className="border-2 border-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Maximum Mortgage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-5xl font-bold text-primary">
                {formatCurrency(result.maxMortgage)}
              </p>
              <p className="text-muted-foreground mt-1">
                Based on effective income of {formatCurrency(result.effectiveIncome)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <Home className="h-4 w-4" />
                  <span className="text-sm">Max Property Price</span>
                </div>
                <p className="text-2xl font-semibold">
                  {formatCurrency(result.maxPropertyPrice)}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Monthly Payment</span>
                </div>
                <p className="text-2xl font-semibold">
                  {formatCurrency(result.monthlyPayment)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NHG Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            {result.nhgEligible ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Eligible for NHG (National Mortgage Guarantee)
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Properties under {formatCurrency(435000)} qualify for NHG,
                    which can lower your interest rate by 0.3-0.5%. One-time fee:{" "}
                    {result.nhgFee ? formatCurrency(result.nhgFee) : "N/A"}
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-600 dark:text-amber-400">
                    Above NHG limit
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your max property price exceeds the {formatCurrency(435000)}{" "}
                    NHG limit. You won&apos;t be able to use this guarantee.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scenarios Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            What-If Scenarios
          </CardTitle>
          <CardDescription>
            See how different factors affect your borrowing capacity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 30% Ruling Comparison */}
            {!has30PercentRuling && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">With 30% ruling</p>
                  <p className="text-sm text-muted-foreground">
                    If you qualify for this tax benefit
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(result.scenarios.with30PercentRuling)}
                  </p>
                  <Badge variant="secondary" className="text-green-600">
                    +
                    {formatCurrency(
                      result.scenarios.with30PercentRuling - result.maxMortgage
                    )}
                  </Badge>
                </div>
              </div>
            )}

            {has30PercentRuling && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Without 30% ruling</p>
                  <p className="text-sm text-muted-foreground">
                    If/when your 30% ruling expires
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-600 dark:text-amber-400">
                    {formatCurrency(result.scenarios.without30PercentRuling)}
                  </p>
                  <Badge variant="secondary" className="text-amber-600">
                    {formatCurrency(
                      result.scenarios.without30PercentRuling - result.maxMortgage
                    )}
                  </Badge>
                </div>
              </div>
            )}

            {/* Partner Scenario */}
            {!hasPartner && result.scenarios.withPartner && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">With a partner earning €50k</p>
                  <p className="text-sm text-muted-foreground">
                    Example dual-income scenario
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(result.scenarios.withPartner)}
                  </p>
                  <Badge variant="secondary" className="text-green-600">
                    +
                    {formatCurrency(
                      result.scenarios.withPartner - result.maxMortgage
                    )}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {warning}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
        <p>
          <strong>Disclaimer:</strong> This calculation is an estimate based on
          general Dutch mortgage rules. Actual borrowing capacity depends on your
          specific situation, bank policies, and current interest rates. Always
          consult with a mortgage advisor for accurate figures.
        </p>
      </div>
    </div>
  );
}
