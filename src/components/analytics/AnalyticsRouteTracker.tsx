"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { normalizePathname } from "@/config/site";
import { trackPageView, trackScrollDepth } from "@/lib/analytics/gtag";

const SCROLL_THRESHOLDS: ReadonlyArray<25 | 50 | 75 | 90> = [25, 50, 75, 90];

export function AnalyticsRouteTracker() {
  const pathname = usePathname() || "/";
  const isInitialMount = useRef(true);
  const firedDepthsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const normalized = normalizePathname(pathname);
    firedDepthsRef.current.clear();

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      trackPageView(normalized, typeof document !== "undefined" ? document.title : undefined);
    }

    const handleScroll = () => {
      const docEl = document.documentElement;
      const scrollable = docEl.scrollHeight - window.innerHeight;
      if (scrollable <= 120) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));

      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !firedDepthsRef.current.has(threshold)) {
          firedDepthsRef.current.add(threshold);
          trackScrollDepth(threshold, normalized);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
