import { IntakeForm } from "@/components/intake";

export const metadata = {
  title: "Start Your Free Assessment | Find Your Home in the Netherlands",
  description:
    "Complete our free assessment to get matched with independent buyers' agents in the Netherlands. Takes 3 minutes, no obligation.",
};

export default function IntakePage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Start your free assessment</h1>
        <p className="text-muted-foreground">
          Tell us about yourself and your home search. We&apos;ll match you with
          local experts who can help.
        </p>
      </div>
      <IntakeForm />
    </main>
  );
}
