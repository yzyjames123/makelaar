"use client";

import { useState } from "react";
import { Calculator, Loader2, Info } from "lucide-react";
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

export interface MortgageFormData {
  grossAnnualSalary: number;
  has30PercentRuling: boolean;
  contractType: "permanent" | "temporary" | "self_employed";
  partnerIncome?: number;
  downPayment?: number;
}

// Internal state type with all fields required (no optional)
interface MortgageFormState {
  grossAnnualSalary: number;
  has30PercentRuling: boolean;
  contractType: "permanent" | "temporary" | "self_employed";
  partnerIncome: number;
  downPayment: number;
}

interface MortgageFormProps {
  onCalculate: (data: MortgageFormData) => Promise<void>;
  isLoading: boolean;
}

export function MortgageForm({ onCalculate, isLoading }: MortgageFormProps) {
  const [formData, setFormData] = useState<MortgageFormState>({
    grossAnnualSalary: 0,
    has30PercentRuling: false,
    contractType: "permanent",
    partnerIncome: 0,
    downPayment: 0,
  });

  const [includePartner, setIncludePartner] = useState(false);
  const [includeDownPayment, setIncludeDownPayment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: MortgageFormData = {
      grossAnnualSalary: formData.grossAnnualSalary,
      has30PercentRuling: formData.has30PercentRuling,
      contractType: formData.contractType,
    };
    if (includePartner && formData.partnerIncome > 0) {
      submitData.partnerIncome = formData.partnerIncome;
    }
    if (includeDownPayment && formData.downPayment > 0) {
      submitData.downPayment = formData.downPayment;
    }
    await onCalculate(submitData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculate Your Mortgage
        </CardTitle>
        <CardDescription>
          Find out how much you can borrow based on Dutch mortgage rules for
          expats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gross Annual Salary */}
          <div className="space-y-2">
            <Label htmlFor="salary">Gross Annual Salary (EUR)</Label>
            <Input
              id="salary"
              type="number"
              placeholder="e.g., 65000"
              value={formData.grossAnnualSalary || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  grossAnnualSalary: parseInt(e.target.value) || 0,
                })
              }
              required
              min={0}
            />
            <p className="text-xs text-muted-foreground">
              Your gross annual salary before taxes
            </p>
          </div>

          {/* Contract Type */}
          <div className="space-y-2">
            <Label>Contract Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "permanent", label: "Permanent" },
                { value: "temporary", label: "Temporary" },
                { value: "self_employed", label: "Self-Employed" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={
                    formData.contractType === option.value
                      ? "default"
                      : "outline"
                  }
                  className="w-full"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      contractType: option.value as MortgageFormData["contractType"],
                    })
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {formData.contractType === "temporary" && (
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Temporary contracts reduce borrowing capacity by ~20%
              </p>
            )}
            {formData.contractType === "self_employed" && (
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Self-employed need 3 years of income history
              </p>
            )}
          </div>

          {/* 30% Ruling */}
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
            <Checkbox
              id="ruling"
              checked={formData.has30PercentRuling}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, has30PercentRuling: checked === true })
              }
            />
            <div className="space-y-1">
              <Label htmlFor="ruling" className="cursor-pointer">
                I have the 30% ruling
              </Label>
              <p className="text-xs text-muted-foreground">
                The 30% ruling is a Dutch tax benefit for skilled migrants that
                makes 30% of your salary tax-free. This significantly increases
                your borrowing capacity.
              </p>
            </div>
          </div>

          {/* Partner Income */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includePartner"
                checked={includePartner}
                onCheckedChange={(checked) => setIncludePartner(checked === true)}
              />
              <Label htmlFor="includePartner" className="cursor-pointer">
                Include partner&apos;s income
              </Label>
            </div>
            {includePartner && (
              <div className="pl-6 space-y-2">
                <Label htmlFor="partnerIncome">
                  Partner&apos;s Gross Annual Salary (EUR)
                </Label>
                <Input
                  id="partnerIncome"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.partnerIncome || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      partnerIncome: parseInt(e.target.value) || 0,
                    })
                  }
                  min={0}
                />
              </div>
            )}
          </div>

          {/* Down Payment */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeDownPayment"
                checked={includeDownPayment}
                onCheckedChange={(checked) =>
                  setIncludeDownPayment(checked === true)
                }
              />
              <Label htmlFor="includeDownPayment" className="cursor-pointer">
                I have savings for a down payment
              </Label>
            </div>
            {includeDownPayment && (
              <div className="pl-6 space-y-2">
                <Label htmlFor="downPayment">Down Payment Amount (EUR)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.downPayment || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      downPayment: parseInt(e.target.value) || 0,
                    })
                  }
                  min={0}
                />
                <p className="text-xs text-muted-foreground">
                  In the Netherlands, you can borrow up to 100% of the property
                  value. A down payment helps cover additional costs like
                  transfer tax and notary fees.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || formData.grossAnnualSalary <= 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Maximum Mortgage
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
