"use client";

import { useState } from "react";
import { Euro, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CostFormData {
  purchasePrice: number;
  buyerType: "first_time" | "regular" | "investor";
  propertyType: "house" | "apartment" | "new_construction";
  useBuyersAgent: boolean;
  useNHG: boolean;
  mortgageAmount?: number;
}

// Internal state type with all fields required (no optional)
interface CostFormState {
  purchasePrice: number;
  buyerType: "first_time" | "regular" | "investor";
  propertyType: "house" | "apartment" | "new_construction";
  useBuyersAgent: boolean;
  useNHG: boolean;
  mortgageAmount: number;
}

interface CostFormProps {
  onCalculate: (data: CostFormData) => Promise<void>;
  isLoading: boolean;
}

export function CostForm({ onCalculate, isLoading }: CostFormProps) {
  const [formData, setFormData] = useState<CostFormState>({
    purchasePrice: 0,
    buyerType: "first_time",
    propertyType: "apartment",
    useBuyersAgent: true,
    useNHG: false,
    mortgageAmount: 0,
  });

  const [customMortgage, setCustomMortgage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: CostFormData = {
      purchasePrice: formData.purchasePrice,
      buyerType: formData.buyerType,
      propertyType: formData.propertyType,
      useBuyersAgent: formData.useBuyersAgent,
      useNHG: formData.useNHG,
    };
    if (customMortgage && formData.mortgageAmount > 0) {
      submitData.mortgageAmount = formData.mortgageAmount;
    }
    await onCalculate(submitData);
  };

  const nhgEligible =
    formData.purchasePrice > 0 &&
    formData.purchasePrice <= 435000 &&
    formData.buyerType !== "investor";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Euro className="h-5 w-5" />
          Calculate Buying Costs
        </CardTitle>
        <CardDescription>
          See all the costs involved in buying a property in the Netherlands
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Purchase Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Purchase Price (EUR)</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 400000"
              value={formData.purchasePrice || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  purchasePrice: parseInt(e.target.value) || 0,
                })
              }
              required
              min={50000}
            />
          </div>

          {/* Buyer Type */}
          <div className="space-y-2">
            <Label>Buyer Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "first_time", label: "First-Time" },
                { value: "regular", label: "Regular" },
                { value: "investor", label: "Investor" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={
                    formData.buyerType === option.value ? "default" : "outline"
                  }
                  className="w-full"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      buyerType: option.value as CostFormData["buyerType"],
                    })
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {formData.buyerType === "first_time" &&
              formData.purchasePrice > 0 &&
              formData.purchasePrice <= 510000 && (
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  No transfer tax for first-time buyers under €510k
                </p>
              )}
            {formData.buyerType === "investor" && (
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Info className="h-3 w-3" />
                10.4% transfer tax applies to investment properties
              </p>
            )}
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "apartment", label: "Apartment" },
                { value: "house", label: "House" },
                { value: "new_construction", label: "New Build" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={
                    formData.propertyType === option.value ? "default" : "outline"
                  }
                  className="w-full"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      propertyType: option.value as CostFormData["propertyType"],
                    })
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {formData.propertyType === "apartment" && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                Apartments have monthly VvE (HOA) fees
              </p>
            )}
          </div>

          {/* Optional Services */}
          <div className="space-y-4 p-4 rounded-lg bg-muted/50">
            <p className="text-sm font-medium">Optional Services</p>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="buyersAgent"
                checked={formData.useBuyersAgent}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, useBuyersAgent: checked === true })
                }
              />
              <div className="space-y-1">
                <Label htmlFor="buyersAgent" className="cursor-pointer">
                  Include buyers&apos; agent (Aankoopmakelaar)
                </Label>
                <p className="text-xs text-muted-foreground">
                  1-2% of purchase price. Recommended for expats unfamiliar with
                  Dutch bidding culture.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="nhg"
                checked={formData.useNHG}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, useNHG: checked === true })
                }
                disabled={!nhgEligible}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="nhg"
                  className={`cursor-pointer ${!nhgEligible ? "text-muted-foreground" : ""}`}
                >
                  Use NHG (National Mortgage Guarantee)
                </Label>
                <p className="text-xs text-muted-foreground">
                  {nhgEligible
                    ? "0.6% fee for lower interest rates. Your property qualifies."
                    : formData.purchasePrice > 435000
                      ? "Not available for properties over €435,000"
                      : "Not available for investment properties"}
                </p>
              </div>
            </div>
          </div>

          {/* Custom Mortgage Amount */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="customMortgage"
                checked={customMortgage}
                onCheckedChange={(checked) => setCustomMortgage(checked === true)}
              />
              <Label htmlFor="customMortgage" className="cursor-pointer">
                Specify mortgage amount (different from purchase price)
              </Label>
            </div>
            {customMortgage && (
              <div className="pl-6 space-y-2">
                <Label htmlFor="mortgageAmount">Mortgage Amount (EUR)</Label>
                <Input
                  id="mortgageAmount"
                  type="number"
                  placeholder="e.g., 350000"
                  value={formData.mortgageAmount || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mortgageAmount: parseInt(e.target.value) || 0,
                    })
                  }
                  min={0}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || formData.purchasePrice <= 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Euro className="mr-2 h-4 w-4" />
                Calculate Total Costs
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
