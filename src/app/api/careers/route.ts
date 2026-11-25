import { NextResponse, type NextRequest } from "next/server";
import { SITE_CONFIG } from "@/config/site";
import { extractClientIp, parseBoundedJsonBody } from "@/lib/api/requestHelpers";
import { sendCareerApplicationEmail } from "@/lib/email/resend";
import { isRateLimited } from "@/lib/security/rateLimit";
import { careerApplicationSchema } from "@/lib/validation/career";

export async function POST(request: NextRequest) {
  try {
    const clientIp = extractClientIp(request);

    if (isRateLimited("careers", clientIp, 60_000, 6)) {
      return NextResponse.json(
        { ok: false, error: "Too many applications submitted. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const parsedJson = await parseBoundedJsonBody(request);
    if ("response" in parsedJson) return parsedJson.response;

    const parsed = careerApplicationSchema.safeParse(parsedJson.data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Please check all required application fields.",
          issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    if (data.companyWebsite && data.companyWebsite.trim().length > 0) {
      return NextResponse.json({ ok: true, accepted: true }, { status: 200 });
    }

    const emailResult = await sendCareerApplicationEmail({
      applicationType: data.applicationType || "job",
      role: data.role || "",
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      location: data.location,
      education: data.education,
      portfolioUrl: data.portfolioUrl,
      resumeUrl: data.resumeUrl,
      experience: data.experience,
      message: data.message,
      sourcePage: data.sourcePage,
    });

    const whatsappSummary = [
      `New ${data.applicationType === "internship" ? "Internship" : "Career"} Application (${data.role}) via dievekter.com:`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      data.location ? `Location: ${data.location}` : "",
      data.education ? `Education: ${data.education}` : "",
      data.portfolioUrl ? `Portfolio: ${data.portfolioUrl}` : "",
      data.resumeUrl ? `Resume: ${data.resumeUrl}` : "",
      data.experience ? `Experience: ${data.experience}` : "",
      data.message ? `Note: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(whatsappSummary)}`;

    return NextResponse.json(
      {
        ok: true,
        emailSent: emailResult.sent,
        recipientEmail: process.env.ENQUIRY_FORWARD_EMAIL || SITE_CONFIG.email,
        whatsappUrl,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to submit application right now. Please email us directly." },
      { status: 500 },
    );
  }
}
