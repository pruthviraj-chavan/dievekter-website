import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { extractClientIp, parseBoundedJsonBody } from "@/lib/api/requestHelpers";
import { sendWhatsAppClickEmail } from "@/lib/email/resend";
import { isDuplicateEvent, isRateLimited } from "@/lib/security/rateLimit";

const whatsappNotifySchema = z.object({
  sourcePage: z.string().trim().max(180).default("/"),
  ctaLabel: z.string().trim().max(140).default("WhatsApp CTA"),
  prefilledMessage: z.string().trim().max(1500).default(""),
  targetUrl: z.string().trim().max(2000).default(""),
  referrer: z.string().trim().max(400).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get("user-agent") || "";
    if (/bot|crawl|spider|headless|lighthouse|slurp|curl/i.test(ua)) {
      return NextResponse.json({ ok: true, skipped: "automated-agent" }, { status: 200 });
    }

    const clientIp = extractClientIp(request);
    if (isRateLimited("wa-notify", clientIp, 60_000, 6)) {
      return NextResponse.json({ ok: true, skipped: "rate-limited" }, { status: 200 });
    }

    const parsedJson = await parseBoundedJsonBody(request, 8_192);
    if ("response" in parsedJson) return parsedJson.response;

    const parsed = whatsappNotifySchema.safeParse(parsedJson.data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid notification payload" }, { status: 400 });
    }

    const { sourcePage, ctaLabel, prefilledMessage, targetUrl, referrer } = parsed.data;
    const dedupKey = `${clientIp}|${sourcePage}|${ctaLabel}`;
    if (isDuplicateEvent(dedupKey, 25_000)) {
      return NextResponse.json({ ok: true, skipped: "dedup" }, { status: 200 });
    }

    const emailResult = await sendWhatsAppClickEmail({
      sourcePage,
      ctaLabel,
      prefilledMessage,
      targetUrl,
      referrer,
      visitorContext: ua ? ua.slice(0, 140) : "Browser",
    });

    return NextResponse.json({ ok: true, emailSent: emailResult.sent }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
