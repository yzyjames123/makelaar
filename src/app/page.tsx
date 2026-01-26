import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Users,
  Clock,
  Euro,
  FileText,
  Search,
  CheckCircle,
  Shield,
  Heart,
  Lock,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Quote,
} from "lucide-react";
import { HeroEmailForm } from "@/components/hero-email-form";
import { StickyCta } from "@/components/sticky-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Sticky CTA */}
      <StickyCta />

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-amsterdam.png"
            alt="Amsterdam cityscape"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/80" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Urgency Badge */}
            <Badge variant="secondary" className="text-sm py-1 px-3">
              <TrendingUp className="h-3 w-3 mr-1" />
              15 expats started their assessment this week
            </Badge>

            <p className="text-sm font-medium text-primary uppercase tracking-wide">
              Trusted by 500+ expats
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-sm">
              Find your Dutch home — faster, smarter, stress-free
            </h1>
            <p className="text-xl text-muted-foreground">
              Skip the confusion of Dutch house hunting. We connect you with local
              experts who understand what expats face — so you can focus on
              finding your perfect home.
            </p>

            {/* Email Capture Form */}
            <div className="pt-4 space-y-4">
              <HeroEmailForm />
              <p className="text-sm text-muted-foreground">
                Takes ~60 seconds · No obligation · Free for expats
              </p>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  GDPR Compliant
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  100% Free
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  No Spam
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-secondary/30">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">87%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Success rate
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                500+
              </p>
              <p className="text-sm text-muted-foreground mt-1">Expats helped</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                &euro;2,500
              </p>
              <p className="text-sm text-muted-foreground mt-1">Avg. saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                3 wks
              </p>
              <p className="text-sm text-muted-foreground mt-1">Faster search</p>
            </div>
          </div>

          {/* Mini Testimonial */}
          <div className="mt-8 max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/images/testimonials/sarah.png"
                alt="Sarah M."
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-sm italic text-foreground">
                  &quot;Within 3 weeks of using this platform, we had keys to our new home in Amsterdam.&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sarah M., moved from the USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's In It For You - USP Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What you get</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to buy your home with confidence
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Time saved</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Skip weeks of research. We know the market and connect you with
                experts who can act fast.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Money saved</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Avoid costly mistakes expats commonly make. Our experts know how
                to negotiate and what to watch for.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Peace of mind</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Navigate Dutch rules with expert guidance. No more second-guessing
                your decisions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Better outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Higher success rate with matched experts who know your target
                neighbourhoods inside out.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
              Sound familiar?
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Buying property in the Netherlands can feel overwhelming
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Unfamiliar rules</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dutch buying processes work differently. Bidding wars,
                  &quot;koopakte,&quot; financing conditions — it&apos;s a lot
                  to learn in a foreign language.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Moving fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Homes sell within days. Without local insight, you&apos;re
                  always one step behind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Limited time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Between work, relocation logistics, and viewings, there&apos;s
                  no time to research every neighbourhood and agent.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Euro className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Uncertain costs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You&apos;re not sure what you can actually afford, or who to
                  trust with your biggest financial decision.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            There&apos;s a better way
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            We&apos;re not a real estate agency. We&apos;re an independent
            platform that helps expats like you connect with trusted local
            buyers&apos; agents — professionals who work exclusively for you,
            not the seller.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-medium px-4 py-2 rounded-full">
            <CheckCircle className="h-5 w-5" />
            One profile. Multiple experts. Higher success.
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Select your area
              </h3>
              <p className="text-muted-foreground">
                Pick your preferred regions and budget. Takes about 60 seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Get matched with local experts
              </h3>
              <p className="text-muted-foreground">
                We connect you with independent buyers&apos; agents who know
                your target areas inside out.
              </p>
            </div>

            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">
                You choose who to work with
              </h3>
              <p className="text-muted-foreground">
                Compare offers and decide who feels right. No pressure, no
                obligation.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/intake">
                Check my buying position
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Form Preview Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">What we&apos;ll ask you</h2>
            <p className="text-muted-foreground">
              2 quick steps to match you with local experts
            </p>
          </div>

          {/* Desktop: Horizontal stepper */}
          <div className="hidden md:flex items-center justify-center gap-8 max-w-xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-sm">Location & Budget</p>
              <p className="text-xs text-muted-foreground">~45 sec</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="font-medium text-sm">Done!</p>
              <p className="text-xs text-muted-foreground">Submit</p>
            </div>
          </div>

          {/* Mobile: Vertical list */}
          <div className="md:hidden space-y-4">
            {[
              { icon: Home, label: "Location & Budget", time: "~45 sec" },
              { icon: CheckCircle, label: "Done!", time: "Submit", isDone: true },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${step.isDone ? "bg-primary" : "bg-primary/10"}`}>
                  <step.icon className={`h-5 w-5 ${step.isDone ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div>
                  <p className="font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Total time: <span className="font-medium">~60 seconds</span>
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Expats who found home</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from people just like you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-background">
              <CardHeader>
                <Quote className="h-8 w-8 text-primary/40 mb-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">
                  &quot;We were overwhelmed by Dutch housing rules. Within 3 weeks
                  of using this platform, we had keys to our new home in
                  Amsterdam.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/testimonials/sarah.png"
                    alt="Sarah M."
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm text-muted-foreground">
                      Moved from the USA
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader>
                <Quote className="h-8 w-8 text-primary/40 mb-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">
                  &quot;The expert they matched us with knew exactly what
                  international buyers face. Saved us from a costly bidding
                  mistake.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/testimonials/raj.png"
                    alt="Raj P."
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Raj P.</p>
                    <p className="text-sm text-muted-foreground">
                      Moved from India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader>
                <Quote className="h-8 w-8 text-primary/40 mb-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">
                  &quot;Moving countries is stressful enough. Having local
                  expertise made the home buying process so much smoother.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/testimonials/emma-tom.png"
                    alt="Emma & Tom"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Emma & Tom</p>
                    <p className="text-sm text-muted-foreground">
                      Moved from the UK
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Built for expats, by design</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Smart intake</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our questionnaire is designed for internationals. We ask the
                  right questions so local experts understand your situation
                  immediately.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Buying feasibility check</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Before you start viewing homes, we help you understand
                  what&apos;s realistic. Budget, mortgage options, timeline — all
                  reviewed upfront.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>One profile, multiple opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Instead of contacting agents one by one, your profile reaches
                  multiple independent experts at once. More eyes on your search.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Local expertise through partners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We work with independent buyers&apos; agents across the
                  Netherlands. They know their regions, the market, and how to win
                  bids.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Transparent from the start</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Independent platform</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;re not tied to any single agency. Our role is to match
              you with the best fit — not push a specific partner.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Free for expats</h3>
            <p className="text-sm text-muted-foreground">
              Our service costs you nothing. Agents only pay when there&apos;s
              a successful match.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Your data, handled carefully</h3>
            <p className="text-sm text-muted-foreground">
              We only share your profile with agents who can actually help. No
              spam, no selling your details.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">No obligation</h3>
            <p className="text-sm text-muted-foreground">
              You&apos;re always in control. If no match feels right,
              that&apos;s okay. You can walk away at any time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Is this really free?
                </h3>
                <p className="text-muted-foreground">
                  Yes. Expats pay nothing to use our platform. Buyers&apos; agents
                  pay a fee when they successfully help someone we referred.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  What is a buyers&apos; agent?
                </h3>
                <p className="text-muted-foreground">
                  A buyers&apos; agent (aankoopmakelaar) works exclusively for
                  you, the buyer. They help you find properties, negotiate the
                  price, and guide you through the legal process. In the
                  Netherlands, most sellers have their own agent — so should you.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  How is this different from going to a real estate agency?
                </h3>
                <p className="text-muted-foreground">
                  Real estate agencies typically represent sellers. We connect you
                  with independent buyers&apos; agents who only represent your
                  interests. And because we work with multiple partners,
                  you&apos;re not limited to one agent&apos;s network.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Can I use this if I&apos;m not in the Netherlands yet?
                </h3>
                <p className="text-muted-foreground">
                  Yes. Many expats start their search before relocating. Our
                  partners are experienced in working with clients remotely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to find your Dutch home?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 500+ expats who found their home faster with local expertise.
            Check your buying position today.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link href="/intake">
              Check my buying position
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-8 text-sm opacity-75">
            Takes ~60 seconds · No obligation · Free for expats
          </p>
        </div>
      </section>
    </main>
  );
}
