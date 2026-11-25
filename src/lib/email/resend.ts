import { SITE_CONFIG } from "@/config/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface EmailSendResult {
  sent: boolean;
  id?: string;
  error?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getRecipients(): string[] {
  const configured = process.env.ENQUIRY_FORWARD_EMAIL?.trim();
  if (configured) {
    const parsed = configured
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.includes("@"));
    if (parsed.length > 0) return parsed;
  }
  return [...SITE_CONFIG.notificationEmails];
}

function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "dieVekter <notifications@dievekter.com>";
}

function formatIstTimestamp(): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());
}

function buildBrandedHtml({
  badge,
  heading,
  intro,
  rows,
  longMessageLabel,
  longMessage,
  footerNote,
}: {
  badge: string;
  heading: string;
  intro: string;
  rows: Array<{ label: string; value: string }>;
  longMessageLabel?: string;
  longMessage?: string;
  footerNote?: string;
}): string {
  const rowHtml = rows
    .filter((r) => r.value.trim().length > 0)
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0e6e0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#57534e;width:165px;vertical-align:top;">
          ${escapeHtml(r.label)}
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0e6e0;font-size:14px;color:#141210;word-break:break-word;vertical-align:top;">
          ${escapeHtml(r.value)}
        </td>
      </tr>`,
    )
    .join("");

  const longSection = longMessage?.trim()
    ? `
      <div style="margin-top:20px;padding:16px 18px;border-radius:12px;background:#fff8f5;border:1px solid #fbe0d4;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#ff5422;margin-bottom:8px;">
          ${escapeHtml(longMessageLabel || "Message / Brief")}
        </div>
        <div style="font-size:14px;line-height:1.65;color:#141210;white-space:pre-wrap;">${escapeHtml(longMessage)}</div>
      </div>`
    : "";

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px 12px;background:#f7f5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#141210;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #fbe0d4;box-shadow:0 8px 28px rgba(20,18,16,0.06);">
    <div style="background:#141210;padding:22px 26px;">
      <span style="display:inline-block;background:#ff5422;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">
        ${escapeHtml(badge)}
      </span>
      <h1 style="margin:12px 0 4px;font-size:20px;line-height:1.3;color:#ffffff;font-weight:700;">
        ${escapeHtml(heading)}
      </h1>
      <p style="margin:0;font-size:13px;color:#a8a29e;">${escapeHtml(intro)}</p>
    </div>
    <div style="padding:22px 26px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #f0e6e0;border-radius:12px;overflow:hidden;">
        <tbody>${rowHtml}</tbody>
      </table>
      ${longSection}
      <p style="margin:20px 0 0;font-size:12px;color:#78716c;line-height:1.5;">
        ${escapeHtml(footerNote || `Received on ${formatIstTimestamp()} IST via www.dievekter.com`)}
      </p>
    </div>
  </div>
</body>
</html>`.trim();
}

async function sendViaResend({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { sent: false, error: "RESEND_API_KEY is not configured" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getFromAddress(),
        to,
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(7000),
    });

    const data = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
    };

    if (!response.ok) {
      return { sent: false, error: data.message || `Resend HTTP ${response.status}` };
    }

    return { sent: true, id: data.id };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Network error contacting Resend",
    };
  }
}

export async function sendEnquiryEmail({
  sourceEndpoint,
  verticalLabel,
  category,
  name,
  email,
  phone,
  message,
}: {
  sourceEndpoint: string;
  verticalLabel: string;
  category: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<EmailSendResult> {
  const recipients = getRecipients();
  const subject = `[dieVekter ${verticalLabel}] New Enquiry from ${name}`;
  const html = buildBrandedHtml({
    badge: verticalLabel,
    heading: `New Website Enquiry — ${name}`,
    intro: `Submitted via ${sourceEndpoint} (${category})`,
    rows: [
      { label: "Full Name", value: name },
      { label: "Email", value: email },
      { label: "Phone / WhatsApp", value: phone || "Not provided" },
      { label: "Vertical", value: verticalLabel },
      { label: "Category", value: category },
      { label: "Source Route", value: sourceEndpoint },
    ],
    longMessageLabel: "Project Brief / Message",
    longMessage: message,
  });

  const text = [
    `New ${verticalLabel} Enquiry (${category})`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Source: ${sourceEndpoint}`,
    "",
    "Message:",
    message,
  ].join("\n");

  return sendViaResend({
    to: recipients,
    subject,
    html,
    text,
    replyTo: email,
  });
}

export async function sendCareerApplicationEmail(payload: {
  applicationType: "job" | "internship";
  role: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  education?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  experience?: string;
  message?: string;
  sourcePage?: string;
}): Promise<EmailSendResult> {
  const recipients = getRecipients();
  const kindLabel = payload.applicationType === "internship" ? "Internship Application" : "Job Application";
  const subject = `[dieVekter Careers] ${kindLabel}: ${payload.role} — ${payload.name}`;

  const html = buildBrandedHtml({
    badge: kindLabel,
    heading: `${payload.role} — ${payload.name}`,
    intro: `Submitted via ${payload.sourcePage || "/jobs"} career portal`,
    rows: [
      { label: "Application Type", value: kindLabel },
      { label: "Target Role", value: payload.role },
      { label: "Candidate Name", value: payload.name },
      { label: "Email", value: payload.email },
      { label: "Phone / WhatsApp", value: payload.phone },
      { label: "City / Work Mode", value: payload.location || "Not specified" },
      { label: "Education", value: payload.education || "Not provided" },
      { label: "Portfolio / GitHub", value: payload.portfolioUrl || "Not provided" },
      { label: "Resume / CV URL", value: payload.resumeUrl || "Not provided" },
    ],
    longMessageLabel: "Experience & Cover Note",
    longMessage: [
      payload.experience ? `Experience / Projects:\n${payload.experience}` : "",
      payload.message ? `Why dieVekter / Cover Note:\n${payload.message}` : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  const text = [
    `New ${kindLabel}: ${payload.role}`,
    `Candidate: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.location ? `Location: ${payload.location}` : "",
    payload.education ? `Education: ${payload.education}` : "",
    payload.portfolioUrl ? `Portfolio: ${payload.portfolioUrl}` : "",
    payload.resumeUrl ? `Resume: ${payload.resumeUrl}` : "",
    payload.experience ? `\nExperience:\n${payload.experience}` : "",
    payload.message ? `\nNote:\n${payload.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return sendViaResend({
    to: recipients,
    subject,
    html,
    text,
    replyTo: payload.email,
  });
}

export async function sendWhatsAppClickEmail({
  sourcePage,
  ctaLabel,
  prefilledMessage,
  targetUrl,
  referrer,
  visitorContext,
}: {
  sourcePage: string;
  ctaLabel: string;
  prefilledMessage: string;
  targetUrl: string;
  referrer?: string;
  visitorContext?: string;
}): Promise<EmailSendResult> {
  const recipients = getRecipients();
  const subject = `[dieVekter WhatsApp Intent] Click on ${sourcePage} (${ctaLabel})`;

  const html = buildBrandedHtml({
    badge: "WhatsApp CTA Activity",
    heading: `Visitor Clicked WhatsApp CTA on ${sourcePage}`,
    intro: "Captured immediately before redirecting visitor to WhatsApp.",
    rows: [
      { label: "Page Path", value: sourcePage },
      { label: "Clicked CTA", value: ctaLabel },
      { label: "Destination Link", value: targetUrl },
      { label: "Referrer", value: referrer || "Direct navigation" },
      { label: "Client Summary", value: visitorContext || "Browser session" },
    ],
    longMessageLabel: "Prefilled WhatsApp Message Details",
    longMessage: prefilledMessage || "(No custom prefilled message attached)",
  });

  const text = [
    `Visitor clicked WhatsApp CTA on ${sourcePage}`,
    `Clicked Button: ${ctaLabel}`,
    `Referrer: ${referrer || "Direct"}`,
    `Prefilled Text: ${prefilledMessage || "(empty)"}`,
    `Link: ${targetUrl}`,
  ].join("\n");

  return sendViaResend({
    to: recipients,
    subject,
    html,
    text,
  });
}

const NEWSLETTER_TRACK_COPY: Record<
  "all" | "technology" | "study_abroad",
  {
    label: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    quickLinks: Array<{ title: string; href: string }>;
  }
> = {
  all: {
    label: "All Topics (Technology & Study Abroad)",
    primaryCtaText: "Explore All Guides on dieVekter Journal",
    primaryCtaHref: "https://www.dievekter.com/blog",
    quickLinks: [
      {
        title: "Agentic AI vs Standard Chatbots in Production",
        href: "https://www.dievekter.com/blog/agentic-ai-vs-standard-chatbots-production-workflows-india",
      },
      {
        title: "Complete Guide to Study in Germany for Indian Students",
        href: "https://www.dievekter.com/blog/study-in-germany-complete-guide-indian-students",
      },
      {
        title: "Custom Software, AI & Automation Services",
        href: "https://www.dievekter.com/services",
      },
    ],
  },
  technology: {
    label: "Technology Solutions & AI Engineering",
    primaryCtaText: "Read Engineering & AI Guides",
    primaryCtaHref: "https://www.dievekter.com/blog/artificial-intelligence",
    quickLinks: [
      {
        title: "Agentic AI vs Standard Chatbots in Production",
        href: "https://www.dievekter.com/blog/agentic-ai-vs-standard-chatbots-production-workflows-india",
      },
      {
        title: "Custom React Websites vs Templates: Technical SEO",
        href: "https://www.dievekter.com/blog/custom-react-websites-vs-templates-technical-seo-indian-businesses",
      },
      {
        title: "Interactive Developer Kit & System Simulators",
        href: "https://www.dievekter.com/development-kit",
      },
    ],
  },
  study_abroad: {
    label: "Study in Germany & Overseas Admissions",
    primaryCtaText: "Open Verified Study in Germany Hub",
    primaryCtaHref: "https://www.dievekter.com/study-abroad/germany",
    quickLinks: [
      {
        title: "APS Certificate India Checklist & Timeline",
        href: "https://www.dievekter.com/blog/aps-certificate-india-checklist-documents-timeline-germany",
      },
      {
        title: "Blocked Account (Sperrkonto) & Health Insurance Guide",
        href: "https://www.dievekter.com/blog/blocked-account-sperrkonto-health-insurance-german-student-visa",
      },
      {
        title: "Book Personalized Overseas Education Counselling",
        href: "https://www.dievekter.com/contact?vertical=study-abroad",
      },
    ],
  },
};

async function syncResendAudienceContact(email: string, firstName?: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();
  if (!apiKey || !audienceId) return false;

  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        ...(firstName ? { first_name: firstName } : {}),
        unsubscribed: false,
      }),
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendNewsletterSubscriptionEmails({
  email,
  name,
  interest,
  sourcePage,
}: {
  email: string;
  name?: string;
  interest: "all" | "technology" | "study_abroad";
  sourcePage: string;
}): Promise<{
  welcome: EmailSendResult;
  internal: EmailSendResult;
  audienceSynced: boolean;
}> {
  const track = NEWSLETTER_TRACK_COPY[interest];
  const greetingName = name?.trim() ? name.trim() : "there";
  const recipients = getRecipients();

  const quickLinksHtml = track.quickLinks
    .map(
      (item) => `
      <li style="margin:8px 0;">
        <a href="${escapeHtml(item.href)}" style="color:#ff5422;text-decoration:none;font-weight:600;">
          ${escapeHtml(item.title)} →
        </a>
      </li>`,
    )
    .join("");

  // Email 1 (Onboarding Welcome + Single Primary Next Step per Email Types Reference)
  const welcomeHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px 12px;background:#f7f5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#141210;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #fbe0d4;box-shadow:0 8px 28px rgba(20,18,16,0.06);">
    <div style="background:#141210;padding:24px 28px;">
      <span style="display:inline-block;background:#ff5422;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">
        dieVekter Dispatch · Welcome
      </span>
      <h1 style="margin:14px 0 6px;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">
        Welcome to dieVekter, ${escapeHtml(greetingName)}.
      </h1>
      <p style="margin:0;font-size:13px;color:#d6d3d1;">
        Track selected: ${escapeHtml(track.label)}
      </p>
    </div>
    <div style="padding:26px 28px;font-size:14px;line-height:1.65;color:#292524;">
      <p style="margin:0 0 14px;">
        Thank you for subscribing to our monthly engineering and study abroad dispatch. You&apos;ll receive practical guides built from real production deployments and verified Germany admissions checklists—never generic filler.
      </p>
      <div style="margin:22px 0;">
        <a href="${escapeHtml(track.primaryCtaHref)}" style="display:inline-block;background:#ff5422;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 22px;border-radius:999px;">
          ${escapeHtml(track.primaryCtaText)} →
        </a>
      </div>
      <div style="margin-top:20px;padding:16px 18px;border-radius:12px;background:#fff8f5;border:1px solid #fbe0d4;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#ff5422;margin-bottom:8px;">
          Recommended Next Reads
        </div>
        <ul style="margin:0;padding-left:18px;">${quickLinksHtml}</ul>
      </div>
      <p style="margin:22px 0 0;font-size:12px;color:#78716c;">
        Need help on a specific software project or university intake? Reply directly to <a href="mailto:${escapeHtml(SITE_CONFIG.email)}" style="color:#141210;font-weight:600;">${escapeHtml(SITE_CONFIG.email)}</a> or message us on WhatsApp (${escapeHtml(SITE_CONFIG.telephone)}).
      </p>
      <hr style="border:none;border-top:1px solid #f0e6e0;margin:20px 0;" />
      <p style="margin:0;font-size:11px;color:#a8a29e;">
        DIEVEKTER · Radhanagari, Kolhapur &amp; Phondaghat, Maharashtra, India ·
        <a href="mailto:${escapeHtml(SITE_CONFIG.email)}?subject=Unsubscribe%20dieVekter%20Dispatch" style="color:#78716c;">Unsubscribe anytime</a>
      </p>
    </div>
  </div>
</body>
</html>`.trim();

  const welcomeText = [
    `Welcome to dieVekter Dispatch, ${greetingName}.`,
    `Track: ${track.label}`,
    "",
    `Start here: ${track.primaryCtaHref}`,
    ...track.quickLinks.map((q) => `- ${q.title}: ${q.href}`),
    "",
    `Questions? Reply to ${SITE_CONFIG.email} or call ${SITE_CONFIG.telephone}.`,
    `Unsubscribe anytime by emailing ${SITE_CONFIG.email}.`,
  ].join("\n");

  const internalHtml = buildBrandedHtml({
    badge: "Newsletter Subscriber",
    heading: `New Dispatch Subscriber — ${email}`,
    intro: `Subscribed from ${sourcePage} (${track.label})`,
    rows: [
      { label: "Subscriber Email", value: email },
      { label: "Subscriber Name", value: name?.trim() || "Not provided" },
      { label: "Topic Track", value: track.label },
      { label: "Source Page", value: sourcePage },
    ],
  });

  const internalText = [
    `New dieVekter Newsletter Subscriber`,
    `Email: ${email}`,
    `Name: ${name?.trim() || "Not provided"}`,
    `Track: ${track.label}`,
    `Source Page: ${sourcePage}`,
  ].join("\n");

  const [welcome, internal, audienceSynced] = await Promise.all([
    sendViaResend({
      to: [email],
      subject: "Welcome to dieVekter Dispatch — Where to Start",
      html: welcomeHtml,
      text: welcomeText,
      replyTo: SITE_CONFIG.email,
    }),
    sendViaResend({
      to: recipients,
      subject: `[dieVekter Newsletter] New subscriber: ${email} (${track.label})`,
      html: internalHtml,
      text: internalText,
      replyTo: email,
    }),
    syncResendAudienceContact(email, name?.trim() || undefined),
  ]);

  return { welcome, internal, audienceSynced };
}
