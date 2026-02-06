import Link from "next/link";
import {
  Calculator,
  Home,
  Euro,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Financial Calculators | Expat Home Buying Tools",
  description:
    "Free calculators for expats buying property in the Netherlands. Calculate your maximum mortgage, total buying costs, and affordability.",
};

const calculators = [
  {
    title: "Mortgage Calculator",
    description:
      "Calculate how much you can borrow based on your income, 30% ruling, and contract type.",
    href: "/calculator/mortgage",
    icon: Home,
    features: [
      "30% ruling impact",
      "Contract type adjustments",
      "Partner income",
      "NHG eligibility check",
    ],
    status: "live",
  },
  {
    title: "Total Cost Calculator",
    description:
      "See all hidden costs of buying a property: transfer tax, notary fees, mortgage costs, and more.",
    href: "/calculator/costs",
    icon: Euro,
    features: [
      "Transfer tax calculation",
      "Notary fees estimate",
      "Buyers' agent costs",
      "Monthly cost breakdown",
    ],
    status: "live",
  },
  {
    title: "Affordability Calculator",
    description:
      "Find out what price range you can realistically afford based on your full financial picture.",
    href: "/calculator/affordability",
    icon: TrendingUp,
    features: [
      "Monthly budget analysis",
      "Savings requirements",
      "Stress test scenarios",
      "Recommendations",
    ],
    status: "coming_soon",
  },
];

export default function CalculatorPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">
          Financial Calculators for Expats
        </h1>
        <p className="text-muted-foreground text-lg">
          Free tools to help you understand your buying power and costs when
          purchasing property in the Netherlands.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {calculators.map((calc) => (
          <Card
            key={calc.href}
            className={`relative ${calc.status === "coming_soon" ? "opacity-75" : ""}`}
          >
            {calc.status === "coming_soon" && (
              <div className="absolute top-4 right-4">
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
            )}
            <CardHeader>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <calc.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>{calc.title}</CardTitle>
              <CardDescription>{calc.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {calc.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              {calc.status === "live" ? (
                <Button asChild className="w-full">
                  <Link href={calc.href}>
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why Use These Calculators */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Use Our Calculators?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🇳🇱</span>
            </div>
            <h3 className="font-semibold mb-2">Dutch Rules</h3>
            <p className="text-sm text-muted-foreground">
              Built specifically for the Dutch mortgage market, including NHG
              and 30% ruling considerations.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🌍</span>
            </div>
            <h3 className="font-semibold mb-2">Expat-Focused</h3>
            <p className="text-sm text-muted-foreground">
              Accounts for factors specific to expats: temporary contracts,
              foreign income, and visa requirements.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">💡</span>
            </div>
            <h3 className="font-semibold mb-2">Plain English</h3>
            <p className="text-sm text-muted-foreground">
              Clear explanations without Dutch jargon. Understand what the
              numbers mean for your situation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto mt-16 text-center p-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-bold mb-3">
          Ready to Start Your Home Search?
        </h2>
        <p className="text-muted-foreground mb-6">
          Complete our quick assessment and get matched with local experts who
          can help you find your perfect Dutch home.
        </p>
        <Button asChild size="lg">
          <Link href="/intake">
            Start Free Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
