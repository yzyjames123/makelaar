"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Gavel,
  FileText,
  Building,
  Landmark,
  Key,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const timelineSteps = [
  { icon: Search, label: "Search", duration: "1-3 mo" },
  { icon: Eye, label: "Viewings", duration: "2-4 wks" },
  { icon: Gavel, label: "Bid", duration: "1-3 days" },
  { icon: FileText, label: "Koopakte", duration: "1-2 wks" },
  { icon: Building, label: "Mortgage", duration: "4-6 wks" },
  { icon: Landmark, label: "Notaris", duration: "6-8 wks" },
  { icon: Key, label: "Keys!", duration: "Day 1" },
];

const explainers = [
  {
    title: "What's a buyers' agent?",
    content:
      "In the Netherlands, sellers have their own agent (verkoopmakelaar) who represents their interests. You need your own agent (aankoopmakelaar) to represent YOUR interests. They help you find properties, understand fair prices, negotiate bids, and navigate the legal process.",
  },
  {
    title: "How bidding works in NL",
    content:
      "Unlike some countries, Dutch property bidding is often a one-shot deal. You submit your offer, and that's usually it — no back-and-forth negotiation rounds. In popular areas, overbidding 5-15% above asking price is common. Without local knowledge, you could overbid by thousands... or lose because you bid too low.",
  },
  {
    title: "The 30% ruling effect",
    content:
      "If you have the 30% ruling, your effective income is higher because 30% of your salary is tax-free. This can increase your mortgage capacity by 25-30%. However, banks will \"stress test\" what happens when the ruling ends (typically after 5 years), so your maximum might be adjusted accordingly.",
  },
  {
    title: "Financing conditions (voorbehoud financiering)",
    content:
      "You can include a clause in your purchase agreement that lets you back out if your mortgage is rejected — this is called \"voorbehoud financiering.\" In competitive markets, some buyers waive this to make their bid more attractive, but this is risky. A good agent will advise you on when it's safe to do this.",
  },
  {
    title: "Costs you might not expect",
    content:
      "Beyond the purchase price, budget an extra 4-6% for: transfer tax (2% for most buyers), notary fees (~€1,500-2,500), mortgage advisor (~€2,000-3,500), valuation report (~€500-800), and potentially a buyers' agent fee (1-2% of purchase price). First-time buyers under €510k may be exempt from transfer tax.",
  },
];

export function DutchBuyingPrimer() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
              For those who just arrived
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Dutch home buying in 90 seconds
            </h2>
            <p className="text-lg text-muted-foreground">
              The process might seem complex, but it follows a predictable path
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            {/* Desktop Timeline */}
            <div className="hidden md:flex items-center justify-between max-w-3xl mx-auto">
              {timelineSteps.map((step, index) => (
                <div key={step.label} className="flex flex-col items-center relative">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.duration}</p>
                  {/* Connector line */}
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-primary/20" style={{ width: "calc(100% - 12px)", left: "calc(50% + 30px)" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden">
              <div className="flex flex-wrap justify-center gap-3">
                {timelineSteps.map((step, index) => (
                  <div key={step.label} className="flex items-center gap-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{step.label}</span>
                    {index < timelineSteps.length - 1 && (
                      <span className="text-muted-foreground mx-1">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expandable Cards */}
          <div className="space-y-3 mb-10">
            {explainers.map((item, index) => (
              <Card
                key={item.title}
                className={`cursor-pointer transition-all ${
                  expandedIndex === index
                    ? "border-primary/50 bg-primary/5"
                    : "hover:border-primary/30"
                }`}
                onClick={() => toggleExpand(index)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    {expandedIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {expandedIndex === index && (
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {item.content}
                    </CardDescription>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Ready to understand your buying power?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <Link href="/calculator/mortgage">
                  <Calculator className="mr-2 h-4 w-4" />
                  Mortgage Calculator
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/calculator/costs">
                  See Total Costs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
