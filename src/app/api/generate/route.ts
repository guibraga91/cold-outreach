import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { checkRateLimit } from "@/lib/rate-limit";

const anthropic = new Anthropic();

async function fetchCompanyInfo(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ColdReachBot/1.0; +https://coldreach.ai)",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return `Could not fetch the target website (HTTP ${res.status}). Using URL as context only.`;
    }

    const html = await res.text();

    // Extract text content from HTML
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);

    return text || "No content could be extracted from the website.";
  } catch {
    return `Could not fetch the target website. Using URL as context only: ${url}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { productName, productDescription, targetUrl, tone, channel } = body;

    if (!productName || !productDescription || !targetUrl || !tone || !channel) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Fetch target company info
    const companyInfo = await fetchCompanyInfo(targetUrl);

    const channelGuidance: Record<string, string> = {
      email: `Format as a cold email with subject line. Keep it under 150 words. Include a clear CTA. Use proper email formatting with greeting and sign-off.`,
      linkedin: `Format as a LinkedIn connection request message or InMail. Keep it under 300 characters for connection requests or under 100 words for InMails. Be conversational and reference something specific about their profile/company.`,
      dm: `Format as a short direct message (Twitter/X DM or similar). Keep it under 100 words. Be casual, direct, and intriguing. No formal greetings needed.`,
    };

    const toneGuidance: Record<string, string> = {
      professional: `Use a professional, business-appropriate tone. Be respectful and formal but not stiff.`,
      casual: `Use a friendly, conversational tone. Like you're messaging a colleague. Relaxed but still competent.`,
      bold: `Use a bold, attention-grabbing tone. Be provocative, challenge assumptions, use unexpected hooks. Stand out from the noise.`,
    };

    const prompt = `You are an expert cold outreach copywriter. Generate personalized outreach messages.

## Your Product
- Name: ${productName}
- Description: ${productDescription}

## Target Company
- URL: ${targetUrl}
- Extracted info from their website: ${companyInfo}

## Requirements
- Channel: ${channel} — ${channelGuidance[channel] ?? channelGuidance.email}
- Tone: ${tone} — ${toneGuidance[tone] ?? toneGuidance.professional}

## Output Format
Return ONLY valid JSON (no markdown, no code blocks) in this exact structure:
{
  "variants": [
    {
      "label": "Variant A — [short angle description]",
      "message": "The full outreach message text",
      "subjectLines": ["Subject line 1", "Subject line 2", "Subject line 3"]
    },
    {
      "label": "Variant B — [short angle description]",
      "message": "The full outreach message text",
      "subjectLines": ["Subject line 1", "Subject line 2", "Subject line 3"]
    },
    {
      "label": "Variant C — [short angle description]",
      "message": "The full outreach message text",
      "subjectLines": ["Subject line 1", "Subject line 2", "Subject line 3"]
    }
  ],
  "followUps": [
    {
      "dayAfter": 3,
      "message": "Follow-up message 1"
    },
    {
      "dayAfter": 7,
      "message": "Follow-up message 2"
    }
  ],
  "companyInsights": "Brief 1-2 sentence summary of what you learned about the target company"
}

Generate 3 distinct variants, each using a different persuasion angle (e.g., pain point, social proof, curiosity, value prop, mutual connection). Each variant should feel unique, not just a rewrite.

For subject lines: only include if the channel is email. For LinkedIn and DM, use empty arrays.
For follow-ups: write 2 follow-up messages that reference the original outreach and add new value.`;

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-20250414",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Failed to generate outreach. Please try again." },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const jsonStr = textBlock.text.trim();
    const result = JSON.parse(jsonStr);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Generate error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI returned an unexpected format. Please try again." },
        { status: 500 }
      );
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
