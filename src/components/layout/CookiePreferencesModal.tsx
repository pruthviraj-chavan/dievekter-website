"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Cookie, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "dv_cookie_preferences_v1";

interface CookiePrefs {
  essential: true;
  analytics: boolean;
  functional: boolean;
  updatedAt?: string;
}

const DEFAULT_PREFS: CookiePrefs = {
  essential: true,
  analytics: true,
  functional: true,
};

function applyConsentToGtag(prefs: CookiePrefs) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    functionality_storage: prefs.functional ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function CookiePreferencesTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CookiePrefs>;
        const resolved: CookiePrefs = {
          essential: true,
          analytics: parsed.analytics !== false,
          functional: parsed.functional !== false,
        };
        setPrefs(resolved);
        applyConsentToGtag(resolved);
      }
    } catch {
      // fallback safely to defaults
    }
  }, []);

  const persist = (next: CookiePrefs) => {
    const withTimestamp: CookiePrefs = { ...next, updatedAt: new Date().toISOString() };
    setPrefs(withTimestamp);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
    } catch {
      // ignore storage quota errors
    }
    applyConsentToGtag(withTimestamp);
    setOpen(false);
    toast.success("Privacy & cookie preferences saved");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            className ||
            "inline-flex items-center gap-1.5 text-stone-300 hover:text-white underline underline-offset-4 transition-colors"
          }
        >
          <Cookie className="h-3.5 w-3.5 text-[#FF5422]" />
          Cookie Preferences &amp; Personal Information
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white border-[#FBE0D4] text-[#141210]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#141210]">
            <ShieldCheck className="h-5 w-5 text-[#FF5422]" />
            Your Privacy &amp; Cookie Choices
          </DialogTitle>
          <DialogDescription className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Manage how DIEVEKTER (dieVekter) uses browser storage and aggregate analytics on{" "}
            <span className="font-medium text-[#141210]">www.dievekter.com</span>. We do not sell
            personal information or run third-party advertising trackers. Read our{" "}
            <Link
              href="/privacy"
              onClick={() => setOpen(false)}
              className="text-[#FF5422] underline hover:no-underline"
            >
              Privacy Policy
            </Link>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-[#FFF8F5] p-4">
            <div>
              <p className="text-sm font-bold text-[#141210]">Strictly Necessary Storage</p>
              <p className="text-xs text-stone-600 mt-1">
                Required for security headers, form validation, anti-spam rate limits, and remembering
                your privacy choices.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Always Active
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4">
            <div>
              <p className="text-sm font-bold text-[#141210]">Performance &amp; Analytics</p>
              <p className="text-xs text-stone-600 mt-1">
                Aggregated page telemetry (GA4) without personal form contents, helping us improve
                navigation and speed.
              </p>
            </div>
            <Switch
              checked={prefs.analytics}
              onCheckedChange={(checked) => setPrefs((p) => ({ ...p, analytics: checked }))}
              aria-label="Toggle Performance and Analytics cookies"
            />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4">
            <div>
              <p className="text-sm font-bold text-[#141210]">Functional Personalization</p>
              <p className="text-xs text-stone-600 mt-1">
                Remembers local browser utility settings in Developer Toolkit and Study Abroad
                preference filters.
              </p>
            </div>
            <Switch
              checked={prefs.functional}
              onCheckedChange={(checked) => setPrefs((p) => ({ ...p, functional: checked }))}
              aria-label="Toggle Functional Personalization storage"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => persist({ essential: true, analytics: false, functional: false })}
            className="rounded-full border-stone-200"
          >
            Required Only
          </Button>
          <Button
            type="button"
            onClick={() => persist(prefs)}
            className="rounded-full bg-[#FF5422] hover:bg-[#e8460e] text-white"
          >
            <Check className="mr-1.5 h-4 w-4" /> Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
