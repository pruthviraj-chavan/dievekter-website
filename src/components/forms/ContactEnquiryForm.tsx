"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/config/site";
import {
  trackEnquiryVerticalSelect,
  trackFormError,
  trackFormStarted,
  trackLeadSubmission,
  type AnalyticsVertical,
} from "@/lib/analytics/gtag";
import { enquirySchema } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils";

const VERTICAL_OPTIONS: Array<{
  id: AnalyticsVertical;
  label: string;
  helper: string;
}> = [
  {
    id: "technology",
    label: "Technology Solutions",
    helper: "Websites, Mobile Apps, Custom Software, AI Agents & Automation",
  },
  {
    id: "study_abroad",
    label: "Study Abroad Consultancy",
    helper: "Study in Germany, University Shortlisting, Admissions & Visa Checklist",
  },
  {
    id: "general",
    label: "General / Partnership",
    helper: "Workshops, Internships or General Business Enquiries",
  },
];

export function ContactEnquiryForm() {
  const [vertical, setVertical] = useState<AnalyticsVertical>("technology");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    companyWebsite: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedState, setSubmittedState] = useState<{
    emailSent: boolean;
    whatsappUrl: string;
  } | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const brief = params.get("brief");
    const vParam = params.get("vertical");
    if (vParam === "study-abroad" || vParam === "study_abroad") {
      setVertical("study_abroad");
    } else if (vParam === "technology") {
      setVertical("technology");
    } else if (brief && /study abroad|germany|abroad study|visa/i.test(brief)) {
      setVertical("study_abroad");
    }
    if (brief) {
      setFormData((prev) => ({ ...prev, message: brief }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStarted("contact_enquiry", "/contact");
    }
    setErrorMsg(null);
    setSubmittedState(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = enquirySchema.safeParse({
      ...formData,
      vertical,
      category: vertical === "study_abroad" ? "study-abroad" : "general-consultation",
    });

    if (!parsed.success) {
      const firstErr = parsed.error.issues[0]?.message || "Please check your form details";
      setErrorMsg(firstErr);
      trackFormError("contact_enquiry", firstErr);
      toast.error(firstErr);
      return;
    }

    setIsSubmitting(true);
    const activeVerticalLabel =
      VERTICAL_OPTIONS.find((item) => item.id === vertical)?.label || "General";

    trackLeadSubmission({
      vertical,
      serviceInterest: activeVerticalLabel,
      channel: "form",
      sourcePage: "/contact",
    });

    let whatsappUrl = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
      `New ${activeVerticalLabel} Enquiry from dievekter.com:\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone || "Not provided"}\nVertical: ${activeVerticalLabel}\nMessage: ${parsed.data.message}`,
    )}`;
    let emailSent = false;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        const json = (await res.json()) as {
          whatsappUrl?: string;
          emailSent?: boolean;
        };
        if (json.whatsappUrl) whatsappUrl = json.whatsappUrl;
        emailSent = Boolean(json.emailSent);
      } else {
        const errJson = (await res.json().catch(() => ({}))) as { error?: string };
        setIsSubmitting(false);
        const msg = errJson.error || "Unable to submit right now. Please try again.";
        setErrorMsg(msg);
        toast.error(msg);
        return;
      }
    } catch {
      // Fallback gracefully if offline
    }

    setIsSubmitting(false);
    setSubmittedState({ emailSent, whatsappUrl });
    toast.success(
      emailSent
        ? "Enquiry emailed to our team! Opening WhatsApp as well."
        : "Enquiry prepared! Opening WhatsApp with your structured brief.",
    );
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setFormData({ name: "", email: "", phone: "", message: "", companyWebsite: "" });
  };

  return (
    <div className="rounded-2xl border border-[#FBE0D4] bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#141210] mb-2">Send an Enquiry</h2>
      <p className="text-xs text-stone-500 mb-6">
        Your brief is emailed straight to our desk ({SITE_CONFIG.email}) with optional instant
        WhatsApp handoff.
      </p>

      <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {VERTICAL_OPTIONS.map((opt) => {
          const selected = vertical === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setVertical(opt.id);
                trackEnquiryVerticalSelect(opt.id, "/contact");
              }}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left transition-colors",
                selected
                  ? "border-[#FF5422] bg-[#FFF5F1] text-[#141210]"
                  : "border-stone-200 bg-white text-stone-600 hover:border-stone-300",
              )}
            >
              <p className="text-xs font-bold">{opt.label}</p>
            </button>
          );
        })}
      </div>

      {submittedState && (
        <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-950">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-semibold">Enquiry Received!</p>
              <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
                {submittedState.emailSent
                  ? "Your full details have been emailed directly to our team and we will follow up shortly."
                  : "Your brief is ready below to message our desk immediately."}
              </p>
              <TrackedLink
                href={submittedState.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                track={{ kind: "contact", channel: "whatsapp", sourcePage: "/contact", vertical }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#141210] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#FF5422] transition-colors"
              >
                Continue on WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
              </TrackedLink>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot anti-spam field hidden from real visitors */}
        <input
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {errorMsg && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700"
          >
            {errorMsg}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#141210] mb-1.5">
            Your Name <span className="text-[#FF5422]">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="bg-stone-50/70 border-stone-200 focus-visible:ring-[#FF5422]"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#141210] mb-1.5">
            Your Email <span className="text-[#FF5422]">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@domain.com"
            className="bg-stone-50/70 border-stone-200 focus-visible:ring-[#FF5422]"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#141210] mb-1.5">
            Phone / WhatsApp Number
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 98765 43210"
            className="bg-stone-50/70 border-stone-200 focus-visible:ring-[#FF5422]"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#141210] mb-1.5">
            Project Scope or Study Plan <span className="text-[#FF5422]">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={
              vertical === "study_abroad"
                ? "Share target intake, preferred country (e.g., Germany), Bachelor's/Master's track..."
                : "Tell us about your website, app, AI agent or automation goal..."
            }
            className="min-h-[130px] bg-stone-50/70 border-stone-200 focus-visible:ring-[#FF5422]"
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full rounded-full py-6 font-semibold text-white bg-[#FF5422] hover:bg-[#e8460e] transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Enquiry...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Enquiry via Email &amp; WhatsApp
              </>
            )}
          </Button>
          <p className="text-center text-xs text-stone-500 mt-3">
            Submitting emails your brief directly to our team and opens WhatsApp. See our{" "}
            <Link href="/privacy" className="underline hover:text-[#FF5422]">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="underline hover:text-[#FF5422]">
              Terms
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
