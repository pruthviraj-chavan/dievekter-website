"use client";

export function notifyWhatsAppClick({
  sourcePage,
  ctaLabel,
  href,
}: {
  sourcePage?: string;
  ctaLabel?: string;
  href: string;
}) {
  if (typeof window === "undefined") return;
  if (!href.includes("wa.me/")) return;

  let prefilledMessage = "";
  try {
    const parsed = new URL(href);
    prefilledMessage = parsed.searchParams.get("text") || "";
  } catch {
    // Ignore malformed href parse issues
  }

  const pagePath = sourcePage || window.location.pathname || "/";
  const payload = JSON.stringify({
    sourcePage: pagePath,
    ctaLabel: (ctaLabel || "WhatsApp CTA").slice(0, 140),
    prefilledMessage: prefilledMessage.slice(0, 1500),
    targetUrl: href.slice(0, 2000),
    referrer: document.referrer ? document.referrer.slice(0, 400) : "",
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/whatsapp-notify", blob);
      return;
    }
    void fetch("/api/whatsapp-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Non-blocking notification failure must never prevent opening WhatsApp
  }
}
