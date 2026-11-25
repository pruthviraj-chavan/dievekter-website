import { NextResponse, type NextRequest } from "next/server";
import { SITE_CONFIG } from "@/config/site";
import { extractClientIp, parseBoundedJsonBody } from "@/lib/api/requestHelpers";
import { sendEnquiryEmail } from "@/lib/email/resend";
import { isRateLimited } from "@/lib/security/rateLimit";
import { enquirySchema } from "@/lib/validation/enquiry";

export async function handleEnquirySubmission(request: NextRequest, sourceEndpoint: string) {
  try {
    const clientIp = extractClientIp(request);

    if (isRateLimited("enquiry", clientIp, 60_000, 8)) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 },
      );
    }

    const parsedJson = await parseBoundedJsonBody(request);
    if ("response" in parsedJson) return parsedJson.response;

    const parsed = enquirySchema.safeParse(parsedJson.data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Validation failed.",
          issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
        },
        { status: 400 },
      );
    }

    const { name, email, phone, vertical, category, message, companyWebsite } = parsed.data;

    // Honeypot trap silently drops bot submissions
    if (companyWebsite && companyWebsite.trim().length > 0) {
      return NextResponse.json({ ok: true, accepted: true }, { status: 200 });
    }

    const verticalLabel =
      vertical === "study_abroad"
        ? "Study Abroad Consultancy"
        : vertical === "technology"
          ? "Technology Solutions"
          : "General / Partnership";

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
    const webhookPromise = webhookUrl
      ? fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceEndpoint,
            vertical,
            verticalLabel,
            category,
            name,
            email,
            phone,
            message,
            receivedAt: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(5000),
        }).catch(() => undefined)
      : Promise.resolve();

    const [emailResult] = await Promise.all([
      sendEnquiryEmail({
        sourceEndpoint,
        verticalLabel,
        category,
        name,
        email,
        phone,
        message,
      }),
      webhookPromise,
    ]);

    const whatsappMessage = `New ${verticalLabel} Enquiry (${category}) via dievekter.com:
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Vertical: ${verticalLabel}
Message: ${message}`;

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    return NextResponse.json(
      {
        ok: true,
        emailSent: emailResult.sent,
        vertical,
        verticalLabel,
        whatsappUrl,
        recipientEmail: process.env.ENQUIRY_FORWARD_EMAIL || SITE_CONFIG.email,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process enquiry right now. Please contact us via email or WhatsApp." },
      { status: 500 },
    );
  }
}
