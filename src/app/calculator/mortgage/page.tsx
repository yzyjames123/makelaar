"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  MortgageForm,
  MortgageFormData,
} from "@/components/calculators/mortgage-form";
import {
  MortgageResults,
  MortgageResult,
} from "@/components/calculators/mortgage-results";
import { Button } from "@/components/ui/button";

export default function MortgageCalculatorPage() {
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastInput, setLastInput] = useState<MortgageFormData | null>(null);

  const handleCalculate = async (data: MortgageFormData) => {
    setIsLoading(true);
    setLastInput(data);

    try {
      const response = await fetch("/api/calculator/mortgage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Calculation failed");
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (error) {
      console.error("Error calculating mortgage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/calculator">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Calculators
          </Link>
        </Button>
      </div>

      {/* Page Header */}
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">
          Expat Mortgage Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate how much you can borrow in the Netherlands based on your income,
          contract type, and 30% ruling status.
        </p>
      </div>

      {/* Calculator Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <MortgageForm onCalculate={handleCalculate} isLoading={isLoading} />
          </div>

          {/* Results */}
          <div>
            {result && lastInput ? (
              <MortgageResults
                result={result}
                has30PercentRuling={lastInput.has30PercentRuling}
                hasPartner={!!lastInput.partnerIncome && lastInput.partnerIncome > 0}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium mb-2">
                    Enter your details
                  </p>
                  <p className="text-sm">
                    Fill in the form to see your maximum mortgage and monthly
                    payment estimates
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              What is the 30% ruling?
            </h3>
            <p className="text-sm text-muted-foreground">
              The 30% ruling is a Dutch tax benefit for skilled migrants. It allows
              employers to pay 30% of your salary as a tax-free allowance, effectively
              increasing your net income. This can significantly boost your mortgage
              borrowing capacity. The ruling is granted for 5 years maximum.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              How much can I borrow in the Netherlands?
            </h3>
            <p className="text-sm text-muted-foreground">
              In the Netherlands, you can typically borrow 4-5 times your gross
              annual income, up to 100% of the property value. Factors like contract
              type (permanent vs temporary), the 30% ruling, and partner income
              affect your maximum mortgage amount.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              What is NHG (National Mortgage Guarantee)?
            </h3>
            <p className="text-sm text-muted-foreground">
              NHG (Nationale Hypotheek Garantie) is a Dutch government-backed
              mortgage guarantee. It protects both you and the bank if you can&apos;t
              repay due to circumstances like divorce or unemployment. Properties
              under €435,000 qualify. Benefits include lower interest rates
              (0.3-0.5% less) and protection against residual debt.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              Can I get a mortgage with a temporary contract?
            </h3>
            <p className="text-sm text-muted-foreground">
              Yes, but it&apos;s more challenging. Banks typically reduce your
              borrowing capacity by 15-20% for temporary contracts. Some banks
              require an employer declaration of intent to extend your contract.
              Converting to a permanent contract before applying can significantly
              improve your mortgage options.
            </p>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Next: Calculate your total buying costs</h3>
              <p className="text-sm text-muted-foreground">
                Know your mortgage? Now discover all the hidden costs of buying in the Netherlands.
              </p>
            </div>
            <Button asChild>
              <Link href="/calculator/costs">
                Cost Calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
