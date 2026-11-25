"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  trackFormError,
  trackFormStarted,
  trackFormSubmitted,
  trackNewsletterSubscribed,
} from "@/lib/analytics/gtag";
import { cn } from "@/lib/utils";
import {
  newsletterSchema,
  type NewsletterInterest,
} from "@/lib/validation/newsletter";

const TRACK_OPTIONS: Array<{ id: NewsletterInterest; label: string }> = [
  { id: "all", label: "All Topics" },
  { id: "technology", label: "Tech & AI" },
  { id: "study_abroad", label: "Study in Germany" },
];

export function NewsletterSignupForm({
  variant = "card",
  sourcePage = "footer",
  defaultInterest = "all",
  className,
}: {
  variant?: "footer" | "card";
  sourcePage?: string;
  defaultInterest?: NewsletterInterest;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<NewsletterInterest>(defaultInterest);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subscribedState, setSubscribedState] = useState<{
    email: string;
    welcomeEmailSent: boolean;
  } | null>(null);
  const startedRef = useRef(false);

  const isDark = variant === "footer";

  const handleFirstFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackFormStarted("newsletter_dispatch", sourcePage);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = newsletterSchema.safeParse({
      email,
      interest,
      sourcePage,
      companyWebsite,
    });

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Please enter a valid email address.";
      setErrorMsg(msg);
      trackFormError("newsletter_dispatch", msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        welcomeEmailSent?: boolean;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        const msg = json.error || "Unable to subscribe right now. Please try again.";
        setErrorMsg(msg);
        trackFormError("newsletter_dispatch", msg);
        toast.error(msg);
        setSubmitting(false);
        return;
      }

      const listName =
        interest === "technology"
          ? "tech_ai_dispatch"
          : interest === "study_abroad"
            ? "study_abroad_dispatch"
            : "all_topics_dispatch";

      trackFormSubmitted("newsletter_dispatch", sourcePage);
      trackNewsletterSubscribed({
        source: sourcePage,
        listName,
        interest,
      });

      setSubscribedState({
        email: parsed.data.email,
        welcomeEmailSent: Boolean(json.welcomeEmailSent),
      });
      setEmail("");
      toast.success(
        json.welcomeEmailSent
          ? "Subscribed! Check your inbox for our welcome dispatch."
          : "Subscribed! You are on the dieVekter Dispatch list.",
      );
    } catch {
      const msg = "Network error while subscribing. Please try again.";
      setErrorMsg(msg);
      trackFormError("newsletter_dispatch", msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        isDark
          ? "border-white/10 bg-white/[0.04] text-white"
          : "border-[#FBE0D4] bg-[#FFF8F5] text-[#141210] shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5422] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            <Mail className="h-3 w-3" /> Monthly Dispatch
          </span>
          <h3
            className={cn(
              "mt-2.5 text-lg sm:text-xl font-bold tracking-tight",
              isDark ? "text-white" : "text-[#141210]",
            )}
          >
            Engineering notes, AI playbooks &amp; Germany intake alerts.
          </h3>
          <p
            className={cn(
              "mt-1 text-xs leading-relaxed",
              isDark ? "text-stone-300" : "text-stone-600",
            )}
          >
            Practical roundups twice a month—zero fluff, instant onboarding resources on signup,
            and one-click unsubscribe anytime. See our{" "}
            <Link
              href="/privacy"
              className={cn(
                "underline underline-offset-2",
                isDark ? "text-white hover:text-[#FF5422]" : "text-[#141210] hover:text-[#FF5422]",
              )}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          {subscribedState ? (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                "rounded-xl border px-4 py-3 text-xs leading-relaxed flex items-start gap-2.5",
                isDark
                  ? "border-emerald-500/40 bg-emerald-950/50 text-emerald-100"
                  : "border-emerald-200 bg-emerald-50 text-emerald-950",
              )}
            >
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-semibold">
                  You&apos;re subscribed ({subscribedState.email}).
                </p>
                <p className="mt-0.5 opacity-90">
                  {subscribedState.welcomeEmailSent
                    ? "We just sent your Welcome Dispatch with curated starting guides."
                    : "Your subscription is logged with our editorial team for the next roundup."}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              {/* Hidden honeypot */}
              <input
                type="text"
                name="companyWebsite"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Newsletter topic preference">
                {TRACK_OPTIONS.map((opt) => {
                  const active = interest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setInterest(opt.id)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5422]",
                        active
                          ? "border-[#FF5422] bg-[#FF5422] text-white"
                          : isDark
                            ? "border-white/15 bg-white/5 text-stone-300 hover:border-[#FF5422]"
                            : "border-stone-200 bg-white text-stone-600 hover:border-[#FF5422]",
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor={`newsletter-email-${sourcePage}`} className="sr-only">
                  Email address
                </label>
                <input
                  id={`newsletter-email-${sourcePage}`}
                  type="email"
                  name="email"
                  required
                  value={email}
                  onFocus={handleFirstFocus}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="you@company.com"
                  className={cn(
                    "h-10 flex-1 rounded-full border px-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5422]",
                    isDark
                      ? "border-white/15 bg-white/10 text-white placeholder:text-stone-400"
                      : "border-stone-200 bg-white text-[#141210] placeholder:text-stone-400",
                  )}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#FF5422] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#e8460e] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5422] focus-visible:ring-offset-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Joining...
                    </>
                  ) : (
                    <>
                      Subscribe <ArrowUpRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <p role="alert" className="text-[11px] font-medium text-red-400">
                  {errorMsg}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
