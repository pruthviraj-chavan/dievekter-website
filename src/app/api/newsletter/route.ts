import { NextResponse, type NextRequest } from "next/server";
import { extractClientIp, parseBoundedJsonBody } from "@/lib/api/requestHelpers";
import { sendNewsletterSubscriptionEmails } from "@/lib/email/resend";
import { isRateLimited } from "@/lib/security/rateLimit";
import { newsletterSchema } from "@/lib/validation/newsletter";

export async function POST(request: NextRequest) {
  try {
    const clientIp = extractClientIp(request);

    if (isRateLimited("newsletter", clientIp, 60_000, 6)) {
      return NextResponse.json(
        { ok: false, error: "Too many subscription requests. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const parsedJson = await parseBoundedJsonBody(request, 8_192);
    if ("response" in parsedJson) return parsedJson.response;

    const parsed = newsletterSchema.safeParse(parsedJson.data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Please provide a valid email address.",
          issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
        },
        { status: 400 },
      );
    }

    const { email, name, interest, sourcePage, companyWebsite } = parsed.data;

    // Honeypot trap silently accepts and drops automated spam
    if (companyWebsite && companyWebsite.trim().length > 0) {
      return NextResponse.json({ ok: true, subscribed: true }, { status: 200 });
    }

    const result = await sendNewsletterSubscriptionEmails({
      email,
      name,
      interest,
      sourcePage,
    });

    return NextResponse.json(
      {
        ok: true,
        subscribed: true,
        welcomeEmailSent: result.welcome.sent,
        teamNotified: result.internal.sent,
        audienceSynced: result.audienceSynced,
        interest,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to subscribe right now. Please email info@dievekter.com directly." },
      { status: 500 },
    );
  }
}
