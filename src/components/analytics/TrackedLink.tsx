"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import {
  trackContactAction,
  trackCtaClick,
  trackOutboundLink,
  trackServiceCta,
  trackStudyAbroadCta,
  type AnalyticsVertical,
} from "@/lib/analytics/gtag";
import { notifyWhatsAppClick } from "@/lib/analytics/whatsappNotify";

type TrackEventSpec =
  | { kind: "service"; slug: string; sourcePage: string }
  | { kind: "study_abroad"; destination: string; sourcePage: string }
  | {
      kind: "contact";
      channel: "whatsapp" | "phone" | "email";
      sourcePage: string;
      vertical?: AnalyticsVertical;
    }
  | { kind: "cta"; location: string; sourcePage: string };

export function TrackedLink({
  href,
  track,
  children,
  className,
  target,
  rel,
  onClick,
  ...rest
}: {
  href: string;
  track?: TrackEventSpec;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
} & Omit<ComponentProps<"a">, "href" | "children">) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const label = event.currentTarget.textContent?.trim() || "Link";
    const sourcePage =
      track?.sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/");

    if (href.includes("wa.me/")) {
      notifyWhatsAppClick({
        sourcePage,
        ctaLabel: label || "WhatsApp CTA",
        href,
      });
    }

    if (href.startsWith("http") && !href.includes("dievekter.com")) {
      trackOutboundLink(href, label, sourcePage);
    }

    if (!track) return;
    if (track.kind === "service") {
      trackServiceCta(track.slug, track.sourcePage);
    } else if (track.kind === "study_abroad") {
      trackStudyAbroadCta(track.destination, track.sourcePage);
    } else if (track.kind === "contact") {
      trackContactAction(track.channel, track.sourcePage, track.vertical || "general");
    } else if (track.kind === "cta") {
      trackCtaClick(label, track.location, track.sourcePage);
    }
  };

  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
