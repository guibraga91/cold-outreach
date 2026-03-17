import Link from "next/link";
import {
  Zap,
  Target,
  BarChart3,
  Mail,
  Linkedin,
  MessageSquare,
  Check,
  ArrowRight,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Target,
    title: "Smart Company Analysis",
    description:
      "AI scrapes target company websites to understand their business, pain points, and opportunities — so your outreach is always relevant.",
  },
  {
    icon: Zap,
    title: "3 Variants Per Prospect",
    description:
      "Get three unique message variants for every prospect, each with a different angle — so you can A/B test and find what resonates.",
  },
  {
    icon: Mail,
    title: "Multi-Channel Ready",
    description:
      "Generate messages optimized for email, LinkedIn, or DMs. Each channel has its own tone, length, and formatting best practices.",
  },
  {
    icon: BarChart3,
    title: "Subject Line Suggestions",
    description:
      "Every email variant comes with 3 subject line options ranked by predicted open rate, based on proven cold email patterns.",
  },
  {
    icon: Clock,
    title: "Follow-Up Templates",
    description:
      "Don't stop at the first touch. Get follow-up message templates that build on your initial outreach with new angles.",
  },
  {
    icon: Shield,
    title: "Spam-Safe Copy",
    description:
      "AI avoids spam trigger words and follows deliverability best practices so your messages actually reach the inbox.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Sales, TechFlow",
    content:
      "ColdReach tripled our reply rates in the first month. The personalization is genuinely impressive — prospects think we spent 20 minutes researching them.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Founder, GrowthLab",
    content:
      "I was skeptical about AI outreach tools, but ColdReach actually understands context. The LinkedIn messages it generates feel natural, not robotic.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "SDR Manager, CloudScale",
    content:
      "We went from 2% to 11% reply rates. My team now uses ColdReach for every single prospect. It's become our secret weapon.",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 99,
    prospects: "500",
    description: "Perfect for solo founders and small teams getting started",
    features: [
      "500 prospects/month",
      "3 variants per prospect",
      "Email & LinkedIn channels",
      "Subject line suggestions",
      "Follow-up templates",
      "Basic analytics",
    ],
  },
  {
    name: "Growth",
    price: 199,
    prospects: "2,000",
    description: "For growing sales teams that need volume and precision",
    popular: true,
    features: [
      "2,000 prospects/month",
      "3 variants per prospect",
      "All channels (Email, LinkedIn, DM)",
      "Subject line suggestions",
      "Follow-up sequences (3-touch)",
      "Advanced analytics",
      "Team collaboration",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: 399,
    prospects: "10,000",
    description: "For high-volume outbound teams and agencies",
    features: [
      "10,000 prospects/month",
      "3 variants per prospect",
      "All channels + custom tones",
      "Subject line suggestions",
      "Follow-up sequences (5-touch)",
      "Full analytics suite",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ColdReach</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-foreground transition"
            >
              Testimonials
            </a>
            <a href="#pricing" className="hover:text-foreground transition">
              Pricing
            </a>
          </div>
          <Link href="/generate">
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              Try Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-rose-950)_0%,_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <Badge
            variant="secondary"
            className="mb-6 border-rose-500/30 bg-rose-500/10 text-rose-400"
          >
            AI-Powered Outreach
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Cold Outreach That
            <br />
            <span className="text-rose-400">Actually Gets Replies</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Input a target company URL and your product description — AI
            analyzes the prospect and crafts 3 personalized outreach variants in
            seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 text-base"
              >
                Generate Outreach Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#features">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-base border-border"
              >
                See How It Works
              </Button>
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-400" />
              Email
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-rose-400" />
              LinkedIn
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              Direct Messages
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="text-rose-400">Book More Meetings</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From company research to follow-up sequences — ColdReach handles
              the heavy lifting so you can focus on closing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="bg-card/50 border-border/50 hover:border-rose-500/30 transition"
              >
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center mb-2">
                    <feature.icon className="w-5 h-5 text-rose-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-24 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by <span className="text-rose-400">Sales Teams</span>{" "}
              Everywhere
            </h2>
            <p className="text-muted-foreground text-lg">
              Join hundreds of teams closing more deals with AI-powered outreach.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-rose-400 text-rose-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <Separator className="mb-4" />
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, <span className="text-rose-400">Transparent</span> Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start free, then pick the plan that fits your outbound volume.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-card border-border/50 relative ${
                  plan.popular ? "border-rose-500 ring-1 ring-rose-500/50" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-rose-500 text-white hover:bg-rose-500">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.prospects} prospects/month
                  </p>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/generate" className="block mt-6">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-rose-500 hover:bg-rose-600 text-white"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to <span className="text-rose-400">10x</span> Your Reply
            Rates?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Try ColdReach free — no credit card required. Generate your first
            outreach in under 30 seconds.
          </p>
          <Link href="/generate">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 text-base"
            >
              Start Generating Outreach
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-rose-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">ColdReach</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ColdReach AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
