"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  Mail,
  Linkedin,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Variant {
  label: string;
  message: string;
  subjectLines: string[];
}

interface FollowUp {
  dayAfter: number;
  message: string;
}

interface GenerateResult {
  variants: Variant[];
  followUps: FollowUp[];
  companyInsights: string;
}

export default function GeneratePage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [tone, setTone] = useState("professional");
  const [channel, setChannel] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          productDescription,
          targetUrl,
          tone,
          channel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(text: string, id: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ColdReach</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Generate Outreach</h1>
          <p className="text-muted-foreground">
            Enter your product and target company — get 3 personalized message
            variants
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Outreach Details</CardTitle>
                <CardDescription>
                  Tell us about your product and who you&apos;re reaching out to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="e.g. ColdReach AI"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">
                      Product Description
                    </Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Briefly describe what your product does and who it's for..."
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      required
                      disabled={loading}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetUrl">Target Company URL</Label>
                    <Input
                      id="targetUrl"
                      type="url"
                      placeholder="https://example.com"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select
                        value={tone}
                        onValueChange={(v) => v && setTone(v)}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Channel</Label>
                      <Select
                        value={channel}
                        onValueChange={(v) => v && setChannel(v)}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">
                            <span className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5" /> Email
                            </span>
                          </SelectItem>
                          <SelectItem value="linkedin">
                            <span className="flex items-center gap-2">
                              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                            </span>
                          </SelectItem>
                          <SelectItem value="dm">
                            <span className="flex items-center gap-2">
                              <MessageSquare className="w-3.5 h-3.5" /> DM
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing & Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate 3 Variants
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Free tier: 3 generations/hour, 10/day
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {!result && !loading && (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-rose-400" />
                  </div>
                  <p className="text-lg font-medium mb-1">
                    Your outreach will appear here
                  </p>
                  <p className="text-sm">
                    Fill in the form and hit generate to get started
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 text-rose-400 animate-spin mx-auto mb-4" />
                  <p className="text-lg font-medium mb-1">
                    Crafting your outreach...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Analyzing target company and generating personalized variants
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Company Insights */}
                {result.companyInsights && (
                  <Card className="bg-rose-500/5 border-rose-500/20">
                    <CardContent className="pt-4 pb-4">
                      <p className="text-sm">
                        <span className="font-medium text-rose-400">
                          Company Insight:
                        </span>{" "}
                        {result.companyInsights}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Message Variants */}
                <Tabs defaultValue="0">
                  <TabsList className="w-full grid grid-cols-3">
                    {result.variants.map((v, i) => (
                      <TabsTrigger key={i} value={String(i)}>
                        Variant {String.fromCharCode(65 + i)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {result.variants.map((variant, i) => (
                    <TabsContent key={i} value={String(i)}>
                      <Card className="bg-card border-border/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">
                                {variant.label}
                              </CardTitle>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  variant.message,
                                  `variant-${i}`
                                )
                              }
                            >
                              {copiedId === `variant-${i}` ? (
                                <>
                                  <Check className="w-3.5 h-3.5 mr-1 text-green-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Subject Lines */}
                          {variant.subjectLines &&
                            variant.subjectLines.length > 0 && (
                              <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Subject Lines
                                </Label>
                                <div className="space-y-1.5">
                                  {variant.subjectLines.map((subject, si) => (
                                    <div
                                      key={si}
                                      className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm group"
                                    >
                                      <span>{subject}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 h-6 px-2"
                                        onClick={() =>
                                          copyToClipboard(
                                            subject,
                                            `subject-${i}-${si}`
                                          )
                                        }
                                      >
                                        {copiedId ===
                                        `subject-${i}-${si}` ? (
                                          <Check className="w-3 h-3 text-green-400" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Message */}
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                              Message
                            </Label>
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-sm leading-relaxed whitespace-pre-wrap">
                              {variant.message}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Follow-ups */}
                {result.followUps && result.followUps.length > 0 && (
                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Follow-Up Templates
                      </CardTitle>
                      <CardDescription>
                        Send these if you don&apos;t hear back after your
                        initial message
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.followUps.map((fu, i) => (
                        <div key={i}>
                          {i > 0 && <Separator className="mb-4" />}
                          <div className="flex items-start justify-between mb-2">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-rose-500/10 text-rose-400 border-rose-500/20"
                            >
                              Day {fu.dayAfter} Follow-up
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() =>
                                copyToClipboard(fu.message, `followup-${i}`)
                              }
                            >
                              {copiedId === `followup-${i}` ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-sm leading-relaxed whitespace-pre-wrap">
                            {fu.message}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
