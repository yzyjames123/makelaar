"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  CostBreakdown,
  CostResult,
} from "@/components/calculators/cost-breakdown";
import { CostForm, CostFormData } from "@/components/calculators/cost-form";
import { Button } from "@/components/ui/button";

export default function CostCalculatorPage() {
  const [result, setResult] = useState<CostResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastInput, setLastInput] = useState<CostFormData | null>(null);

  const handleCalculate = async (data: CostFormData) => {
    setIsLoading(true);
    setLastInput(data);

    try {
      const response = await fetch("/api/calculator/costs", {
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
      console.error("Error calculating costs:", error);
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
        <h1 className="text-3xl font-bold mb-3">Total Cost Calculator</h1>
        <p className="text-muted-foreground">
          Discover all the hidden costs of buying a property in the Netherlands
          &mdash; from transfer tax to notary fees.
        </p>
      </div>

      {/* Calculator Content */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form - narrower */}
          <div className="lg:col-span-2">
            <CostForm onCalculate={handleCalculate} isLoading={isLoading} />
          </div>

          {/* Results - wider */}
          <div className="lg:col-span-3">
            {result && lastInput ? (
              <CostBreakdown
                result={result}
                purchasePrice={lastInput.purchasePrice}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium mb-2">
                    Enter property details
                  </p>
                  <p className="text-sm">
                    Fill in the form to see a complete breakdown of all buying
                    costs
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
          Understanding Dutch Buying Costs
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              What is transfer tax (overdrachtsbelasting)?
            </h3>
            <p className="text-sm text-muted-foreground">
              Transfer tax is paid when buying existing property. First-time
              buyers aged 18-35 pay 0% on properties up to €510,000. Regular
              buyers pay 2%. Investors buying non-owner-occupied property pay
              10.4%. New construction is exempt from transfer tax but includes
              21% VAT in the price.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              Do I need a buyers&apos; agent (aankoopmakelaar)?
            </h3>
            <p className="text-sm text-muted-foreground">
              While not required, a buyers&apos; agent is highly recommended for
              expats. They negotiate on your behalf, help with bidding strategy,
              and navigate the Dutch buying process. Typical cost is 1-2% of
              purchase price or a fixed fee. In competitive markets, they can
              save you money and stress.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">What is VvE?</h3>
            <p className="text-sm text-muted-foreground">
              VvE (Vereniging van Eigenaren) is the Dutch equivalent of a
              Homeowners Association (HOA). All apartment owners are members.
              Monthly contributions fund building maintenance, insurance, and
              reserves. Always check VvE meeting minutes and financial reserves
              before buying &mdash; a poorly managed VvE can lead to unexpected
              costs.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              What does a notary do in the Netherlands?
            </h3>
            <p className="text-sm text-muted-foreground">
              The notary (notaris) is a required neutral party in Dutch property
              transactions. They verify the purchase agreement, check for liens,
              handle the money transfer, and officially register the property
              transfer. You&apos;ll pay for two deeds: the transfer deed
              (leveringsakte) and mortgage deed (hypotheekakte).
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">
              What is a bank guarantee (bankgarantie)?
            </h3>
            <p className="text-sm text-muted-foreground">
              When you sign the purchase agreement, you typically need to
              provide a 10% deposit as security. If you don&apos;t have this
              cash available, your bank can provide a guarantee instead for a
              small fee (€250-500). This guarantees the seller will receive the
              deposit if you default.
            </p>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Next: Find schools for your children</h3>
              <p className="text-sm text-muted-foreground">
                Moving with family? Explore international schools across the Netherlands.
              </p>
            </div>
            <Button asChild>
              <Link href="/schools">
                Find Schools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
