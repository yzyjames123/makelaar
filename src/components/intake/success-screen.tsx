"use client";

import Link from "next/link";
import { CheckCircle, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SuccessScreenProps {
  email: string;
}

export function SuccessScreen({ email }: SuccessScreenProps) {
  return (
    <div className="max-w-lg mx-auto">
      <Card className="text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">You&apos;re all set!</CardTitle>
          <CardDescription className="text-base">
            Local experts in your regions will reach out soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Check your inbox at {email}</p>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll receive updates and agent responses at this
                  address.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">What happens next?</strong>
            </p>
            <ul className="space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">1.</span>
                We review your profile and assess your buying position
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">2.</span>
                Relevant buyers&apos; agents in your regions receive your
                profile
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">3.</span>
                Agents who can help will reach out to you directly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">4.</span>
                You choose who to work with — no pressure, no obligation
              </li>
            </ul>
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
