declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown> | unknown[] | IArguments>;
  }
}

export type AnalyticsVertical = "technology" | "study_abroad" | "general";

const SENSITIVE_KEYS = new Set([
  "email",
  "phone",
  "mobile",
  "name",
  "full_name",
  "message",
  "user_email",
  "user_phone",
]);

function sanitizeParams(
  params?: Record<string, string | number | boolean | undefined>,
): Record<string, string | number | boolean> {
  const safe: Record<string, string | number | boolean> = {};
  if (!params) return safe;
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (SENSITIVE_KEYS.has(key.toLowerCase())) continue;
    if (typeof value === "string" && value.includes("@") && !value.includes(" ")) continue;
    safe[key] = value;
  }
  return safe;
}

export function getGtmContainerId(): string {
  const envId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return envId || "GTM-NKRTP332";
}

export function getGaMeasurementId(): string {
  const envId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return envId || "G-XLDPHSXXCS";
}

export function inferContentGroup(pathname: string): string {
  if (pathname.startsWith("/study-abroad")) return "study_abroad";
  if (pathname.startsWith("/blog")) return "journal";
  if (pathname.startsWith("/locations")) return "locations";
  if (
    pathname.startsWith("/development-kit") ||
    pathname.startsWith("/ai-agents-library") ||
    pathname === "/fun"
  ) {
    return "tools";
  }
  if (pathname === "/jobs" || pathname === "/internship") return "careers";
  if (
    pathname.startsWith("/services") ||
    pathname.startsWith("/solutions") ||
    pathname.startsWith("/agents") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/portfolio") ||
    pathname.startsWith("/projects")
  ) {
    return "technology";
  }
  return "company";
}

export function pushDataLayer(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...sanitizeParams(params),
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  const safe = sanitizeParams(params);
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safe);
  }
  pushDataLayer(eventName, safe);
}

export function trackPageView(pathname: string, title?: string) {
  if (typeof window === "undefined") return;
  const contentGroup = inferContentGroup(pathname);
  const payload = {
    page_path: pathname,
    page_location: window.location.href,
    content_group: contentGroup,
    ...(title ? { page_title: title } : {}),
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", payload);
  }
  pushDataLayer("virtual_page_view", payload);
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 90, pagePath: string) {
  trackEvent("scroll_depth", {
    depth,
    page: pagePath,
    content_group: inferContentGroup(pagePath),
  });
}

export function trackOutboundLink(linkUrl: string, linkText: string, sourcePage: string) {
  trackEvent("outbound_link_clicked", {
    link_url: linkUrl,
    link_text: linkText.slice(0, 80),
    page: sourcePage,
  });
}

export function trackCtaClick(buttonText: string, ctaLocation: string, page: string) {
  trackEvent("cta_clicked", {
    button_text: buttonText.slice(0, 80),
    cta_location: ctaLocation,
    page,
  });
}

export function trackFormStarted(formName: string, formLocation: string) {
  trackEvent("form_started", {
    form_name: formName,
    form_location: formLocation,
  });
}

export function trackFormSubmitted(formName: string, formLocation: string) {
  trackEvent("form_submitted", {
    form_name: formName,
    form_location: formLocation,
  });
}

export function trackFormError(formName: string, errorType: string) {
  trackEvent("form_error", {
    form_name: formName,
    error_type: errorType.slice(0, 120),
  });
}

export function trackEnquiryVerticalSelect(vertical: AnalyticsVertical, sourcePage: string) {
  trackEvent("enquiry_vertical_select", {
    vertical,
    source_page: sourcePage,
  });
}

export function trackLeadSubmission({
  vertical,
  serviceInterest,
  channel = "form",
  sourcePage,
}: {
  vertical: AnalyticsVertical;
  serviceInterest: string;
  channel?: "whatsapp" | "email" | "form";
  sourcePage: string;
}) {
  trackEvent("generate_lead", {
    vertical,
    service_interest: serviceInterest,
    channel,
    source_page: sourcePage,
  });
  trackEvent("contact_submitted", {
    inquiry_type: vertical,
    channel,
    source_page: sourcePage,
  });
}

export function trackNewsletterSubscribed({
  source,
  listName,
  interest,
}: {
  source: string;
  listName: string;
  interest: string;
}) {
  trackEvent("newsletter_subscribed", {
    source,
    list_name: listName,
    vertical_interest: interest,
  });
}

export function trackSearchPerformed({
  query,
  searchLocation,
  resultsCount,
}: {
  query: string;
  searchLocation: string;
  resultsCount: number;
}) {
  const cleaned = query.trim().slice(0, 80);
  if (!cleaned || cleaned.includes("@")) return;
  trackEvent("search", {
    search_term: cleaned,
    search_location: searchLocation,
    results_count: resultsCount,
  });
}

export function trackContactAction(
  channel: "whatsapp" | "phone" | "email",
  sourcePage: string,
  vertical: AnalyticsVertical = "general",
) {
  trackEvent(`${channel}_click`, {
    source_page: sourcePage,
    vertical,
  });
}

export function trackStudyAbroadCta(destination: string, sourcePage: string) {
  trackEvent("study_abroad_cta_click", {
    destination,
    source_page: sourcePage,
  });
}

export function trackServiceCta(serviceSlug: string, sourcePage: string) {
  trackEvent("service_cta_click", {
    service_slug: serviceSlug,
    source_page: sourcePage,
  });
}

export function trackBlogCategorySelect(category: string) {
  trackEvent("blog_category_filter", {
    category,
  });
}
