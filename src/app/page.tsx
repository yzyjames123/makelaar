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
  Quote,
  Calculator,
  GraduationCap,
  Building2,
  MapPin,
  AlertTriangle,
  HelpCircle,
  Percent,
  Gavel,
  Languages,
} from "lucide-react";
import { HeroEmailForm } from "@/components/hero-email-form";
import { DutchBuyingPrimer } from "@/components/home/dutch-buying-primer";
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
              <Home className="h-3 w-3 mr-1" />
              3 expats found their home this month via matched agents
            </Badge>

            <div className="space-y-2">
              <p className="text-sm font-medium text-primary uppercase tracking-wide">
                Trusted by 500+ expats from around the world
              </p>
              {/* Country Flags */}
              <div className="flex items-center justify-center gap-2 text-lg">
                <span title="USA">🇺🇸</span>
                <span title="UK">🇬🇧</span>
                <span title="India">🇮🇳</span>
                <span title="Germany">🇩🇪</span>
                <span title="France">🇫🇷</span>
                <span title="Spain">🇪🇸</span>
                <span title="Brazil">🇧🇷</span>
                <span className="text-xs text-muted-foreground ml-1">+40 more</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-sm">
              You moved 5,000 km.{" "}
              <span className="text-primary">We&apos;ll help you find home.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Relocating is hard enough. We connect you with buyers&apos; agents who&apos;ve
              helped hundreds of expats navigate koopaktes, bidding wars, and Dutch
              mortgages — all in English.
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

      {/* Explore Tools Section */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore our free tools</h2>
            <p className="text-lg text-muted-foreground">
              Useful resources to help you prepare for buying a home in the Netherlands
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Financial Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Calculate your mortgage capacity and total buying costs with Dutch-specific rules.
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/calculator">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">School Finder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Find international schools for your children across the Netherlands.
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/schools">
                    Find Schools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Property Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Browse available properties for sale across the Netherlands.
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/properties">
                    Search
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group opacity-60">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Neighborhoods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Explore areas and find the perfect neighborhood for your lifestyle.
                </CardDescription>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
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
              The Dutch housing market wasn&apos;t designed with expats in mind
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-background/80 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-lg">You don&apos;t know what you don&apos;t know</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Koopakte, ontbindende voorwaarden, NHG — Dutch terms that could
                  cost you thousands if misunderstood. And nobody explains them
                  in plain English.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-lg">Homes sell before you can translate the listing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  By the time you figure out what an &quot;appartement met
                  balkon&quot; actually looks like, it&apos;s already sold.
                  Dutch buyers move fast.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-lg">Your visa clock is ticking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You need a permanent address before your work permit expires.
                  But you can&apos;t rush a six-figure decision — or can you?
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <Gavel className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-lg">Fear of bidding blind</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Without local knowledge, you could overbid by thousands — or
                  lose because you bid too low. In Amsterdam, 15% over asking is
                  &quot;normal.&quot;
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <Percent className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-lg">The 30% ruling question mark</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Does it increase your mortgage capacity? What happens when it
                  ends? Banks give conflicting answers. You need someone who
                  actually knows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/80 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-lg">Trust is hard to build from scratch</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You don&apos;t have a network to recommend a good makelaar.
                  Google reviews only tell you so much. How do you know who to
                  trust?
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dutch Buying 101 Primer */}
      <DutchBuyingPrimer />

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
      <section id="how-it-works" className="bg-muted/50 py-16 md:py-20">
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
      <section id="testimonials" className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Expats who found home</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from people who faced the same challenges you&apos;re facing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-background">
              <CardHeader>
                <Quote className="h-8 w-8 text-primary/40 mb-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">
                  &quot;We lost two bids before finding Makelaar Match. Our agent
                  explained Amsterdam Oost bidding culture — we needed to bid 15%
                  over asking. Third attempt? Accepted same day.&quot;
                </p>
                <div className="pt-2 border-t">
                  <p className="text-xs text-primary font-medium mb-3">
                    What helped: Understanding local overbidding norms
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
                      <p className="font-semibold flex items-center gap-2">
                        Sarah M. <span className="text-base">🇺🇸</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Senior PM · San Francisco → Amsterdam
                      </p>
                    </div>
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
                  &quot;My employer gave me 30 days to find housing. I was panicking.
                  The matched agent understood visa timelines and helped me get a
                  signed koopakte in 3 weeks.&quot;
                </p>
                <div className="pt-2 border-t">
                  <p className="text-xs text-primary font-medium mb-3">
                    What helped: Agent who understood visa pressure
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
                      <p className="font-semibold flex items-center gap-2">
                        Raj P. <span className="text-base">🇮🇳</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Software Engineer · Bangalore → Utrecht
                      </p>
                    </div>
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
                  &quot;We assumed buying in NL would be like the UK — it&apos;s not.
                  Our agent saved us from waiving the building inspection on a
                  house with foundation issues.&quot;
                </p>
                <div className="pt-2 border-t">
                  <p className="text-xs text-primary font-medium mb-3">
                    What helped: Agent who protected us from ourselves
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
                      <p className="font-semibold flex items-center gap-2">
                        Emma & Tom <span className="text-base">🇬🇧</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Marketing Directors · London → Rotterdam
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Country Distribution */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-3">Where our expats come from</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span>🇺🇸</span> USA <span className="text-muted-foreground">28%</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1">
                <span>🇬🇧</span> UK <span className="text-muted-foreground">22%</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1">
                <span>🇮🇳</span> India <span className="text-muted-foreground">18%</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1">
                <span>🇩🇪</span> Germany <span className="text-muted-foreground">12%</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">+40 other countries</span>
            </div>
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
          <h2 className="text-3xl font-bold">Built for trust, not just transactions</h2>
          <p className="text-lg text-muted-foreground mt-3">
            We know you&apos;re making the biggest financial decision of your life in a foreign country
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Languages className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">English guaranteed</h3>
            <p className="text-sm text-muted-foreground">
              Every matched agent speaks fluent English. No translation needed,
              no miscommunication on critical details.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Percent className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">30% ruling specialists</h3>
            <p className="text-sm text-muted-foreground">
              Our agents understand your unique tax situation and exactly how it
              affects your mortgage capacity.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Agents vetted by us</h3>
            <p className="text-sm text-muted-foreground">
              We only work with registered NVM/VBO agents who&apos;ve
              successfully helped expats before.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Independent platform</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;re not tied to any single agency. Our role is to match
              you with the best fit — not push a specific partner.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Free for expats</h3>
            <p className="text-sm text-muted-foreground">
              Our service costs you nothing. Agents only pay when there&apos;s
              a successful match.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">No obligation, ever</h3>
            <p className="text-sm text-muted-foreground">
              You&apos;re always in control. If no match feels right,
              walk away. No pressure, no follow-up spam.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Frequently asked questions
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Real questions from expats like you
            </p>
            <div className="space-y-6">
              {/* About the Platform */}
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Is this really free?
                </h3>
                <p className="text-muted-foreground">
                  Yes. Expats pay nothing to use our platform. Buyers&apos; agents
                  pay a fee when they successfully help someone we referred.
                  You&apos;ll never see an invoice from us.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  What is a buyers&apos; agent (aankoopmakelaar)?
                </h3>
                <p className="text-muted-foreground">
                  In the Netherlands, sellers have their own agent who represents
                  their interests. A buyers&apos; agent works exclusively for you —
                  helping you find properties, understand market value, negotiate
                  the price, and navigate the legal process. Think of them as your
                  local expert and advocate.
                </p>
              </div>

              {/* About Mortgages & Finance */}
              <div className="bg-background rounded-lg p-6 border-l-4 border-primary">
                <h3 className="font-semibold text-lg mb-2">
                  Does my 30% ruling affect my mortgage?
                </h3>
                <p className="text-muted-foreground">
                  Yes, significantly. The 30% ruling increases your net income,
                  which can boost mortgage capacity by 25-30%. However, banks will
                  also &quot;stress test&quot; what happens when it ends (typically after 5 years).
                  Our matched agents can help you plan for both scenarios and find
                  lenders who understand expat situations.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border-l-4 border-primary">
                <h3 className="font-semibold text-lg mb-2">
                  I have a temporary contract. Can I still get a mortgage?
                </h3>
                <p className="text-muted-foreground">
                  Yes, though it&apos;s harder. Some banks require permanent contracts,
                  but many accept temporary contracts with a &quot;positive employer
                  declaration.&quot; Expats in skills shortage sectors (tech, healthcare)
                  often have better options. Our agents know which lenders are
                  expat-friendly.
                </p>
              </div>

              {/* About the Process */}
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  How does bidding work here? I hear you need to overbid.
                </h3>
                <p className="text-muted-foreground">
                  In popular areas like Amsterdam, overbidding 5-15% over asking
                  price is common. Unlike some countries, you typically make one
                  offer — no back-and-forth negotiation rounds. A buyers&apos; agent
                  helps you understand local market conditions and bid
                  competitively without overpaying.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  What&apos;s the timeline from search to keys?
                </h3>
                <p className="text-muted-foreground">
                  Typically 3-6 months total. Finding a home: 1-3 months. Mortgage
                  approval: 4-6 weeks. Notary and closing: 6-8 weeks. Total costs
                  are due at closing. Our agents help you understand each phase
                  and what to prepare in advance.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  What if I need to buy before I arrive in the Netherlands?
                </h3>
                <p className="text-muted-foreground">
                  Common for relocating professionals. Our agents can do video
                  viewings, handle paperwork digitally, and coordinate with your
                  relocation company. We&apos;ve helped many expats buy without
                  physically being in NL until the key handover.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  How is this different from searching Funda myself?
                </h3>
                <p className="text-muted-foreground">
                  Funda shows you listings, but it can&apos;t tell you if €450k is a
                  good price, whether the neighborhood floods, or how to win a
                  bidding war against local buyers. A buyers&apos; agent provides the
                  context, expertise, and negotiation skills that a website
                  simply can&apos;t.
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
