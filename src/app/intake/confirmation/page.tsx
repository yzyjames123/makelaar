import Link from "next/link";
import { CheckCircle, Home, Mail, ArrowRight, Clock, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "You're All Set! | ExpatsNL Home Finder",
  description:
    "Thank you for completing your assessment. Local buyers' agents will be in touch soon.",
};

export default function ConfirmationPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <Card className="text-center mb-8">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-3xl">You&apos;re all set!</CardTitle>
            <CardDescription className="text-lg">
              Your profile has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 text-left">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Check your inbox</p>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll receive a confirmation email with next steps.
                    Make sure to check your spam folder.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Profile review</p>
                  <p className="text-sm text-muted-foreground">
                    We review your profile and assess your buying position within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Expert matching</p>
                  <p className="text-sm text-muted-foreground">
                    Relevant buyers&apos; agents in your selected regions receive your profile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Agents reach out</p>
                  <p className="text-sm text-muted-foreground">
                    Agents who can help will contact you directly via email within 2-3 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">You choose</p>
                  <p className="text-sm text-muted-foreground">
                    Compare offers and decide who to work with. No pressure, no obligation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8 bg-muted/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">24h</p>
                <p className="text-xs text-muted-foreground">Profile review</p>
              </div>
              <div>
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">2-5</p>
                <p className="text-xs text-muted-foreground">Agents notified</p>
              </div>
              <div>
                <MessageSquare className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">2-3 days</p>
                <p className="text-xs text-muted-foreground">First contact</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to homepage
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/#faq">
              Learn more about the process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Questions */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Questions? Email us at{" "}
          <a href="mailto:hello@expatsnl.com" className="text-primary hover:underline">
            hello@expatsnl.com
          </a>
        </p>
      </div>
    </main>
  );
}
