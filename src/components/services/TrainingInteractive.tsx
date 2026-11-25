"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle, Loader2, Play, Send, X } from "lucide-react";
import { toast } from "sonner";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/config/site";

function ModalEnquiryDialog({
  open,
  onClose,
  title,
  subtitle,
  category,
  defaultMessageLabel,
  defaultMessagePlaceholder,
  sourcePage,
  directWhatsAppText,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  category: string;
  defaultMessageLabel: string;
  defaultMessagePlaceholder: string;
  sourcePage: string;
  directWhatsAppText: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [doneUrl, setDoneUrl] = useState<string | null>(null);

  if (!open) return null;

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and details.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          vertical: "technology",
          category,
          message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        whatsappUrl?: string;
      };
      if (!res.ok || !json.ok) {
        toast.error(json.error || "Unable to send request right now.");
        setSending(false);
        return;
      }
      setDoneUrl(
        json.whatsappUrl ||
          `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(directWhatsAppText)}`,
      );
      toast.success("Details emailed straight to our team!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error("Network error sending request.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs text-left"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-3xl border border-[#FBE0D4] bg-white p-6 sm:p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#141210]">{title}</h2>
            <p className="mt-1 text-xs text-stone-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-[#141210]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {doneUrl ? (
          <div className="py-7 text-center">
            <CheckCircle className="mx-auto h-10 w-10 text-emerald-600" />
            <h3 className="mt-3 text-lg font-bold text-[#141210]">Request Emailed!</h3>
            <p className="mt-1.5 text-xs text-stone-600">
              Our team received your details via email and will follow up promptly.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <TrackedLink
                href={doneUrl}
                target="_blank"
                rel="noopener noreferrer"
                track={{ kind: "contact", channel: "whatsapp", sourcePage }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#141210] px-4 py-2 text-xs font-semibold text-white hover:bg-[#FF5422]"
              >
                Also Message on WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
              </TrackedLink>
              <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submitForm} className="mt-4 space-y-3.5">
            <div>
              <Label htmlFor="m-name" className="text-xs font-semibold text-[#141210]">
                Your Name *
              </Label>
              <Input
                id="m-name"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="m-email" className="text-xs font-semibold text-[#141210]">
                  Email Address *
                </Label>
                <Input
                  id="m-email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="m-phone" className="text-xs font-semibold text-[#141210]">
                  Phone / WhatsApp
                </Label>
                <Input
                  id="m-phone"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="m-msg" className="text-xs font-semibold text-[#141210]">
                {defaultMessageLabel} *
              </Label>
              <Textarea
                id="m-msg"
                rows={3}
                required
                placeholder={defaultMessagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <TrackedLink
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(directWhatsAppText)}`}
                target="_blank"
                rel="noopener noreferrer"
                track={{ kind: "contact", channel: "whatsapp", sourcePage }}
                className="text-xs font-semibold text-[#FF5422] hover:underline"
              >
                Quick WhatsApp instead →
              </TrackedLink>
              <Button
                type="submit"
                disabled={sending}
                className="rounded-full bg-[#FF5422] hover:bg-[#e8460e] text-white px-6"
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send via Email
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function BookWorkshopButton({
  label = "Book a Workshop",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="lg" className={className} onClick={() => setOpen(true)}>
        <Calendar className="w-4 h-4 mr-2" /> {label}
      </Button>
      <ModalEnquiryDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Book an AI Training Workshop"
        subtitle="Share your school, college, or team details — delivered straight to our workshop email desk."
        category="ai-workshop"
        defaultMessageLabel="School / College & Preferred Schedule"
        defaultMessagePlaceholder="Institution name, expected participants, preferred dates & city..."
        sourcePage="/services/ai-training-workshops"
        directWhatsAppText="Hi, I'm interested in booking an AI Training Workshop for our institution. Please share more details."
      />
    </>
  );
}

export function ScrollToInquiryButton({
  label = "Enroll Now",
  className,
  showIcon = true,
}: {
  label?: string;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <Button
      size="lg"
      className={className}
      onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
    >
      {showIcon && <Play className="mr-2 h-4 w-4" />}
      {label}
    </Button>
  );
}

export function AgenticTrainingInquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          vertical: "technology",
          category: "agentic-ai-training",
          message: message.trim() || "Requesting Agentic AI Training syllabus and cohort schedule.",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        whatsappUrl?: string;
      };
      if (!res.ok || !json.ok) {
        toast.error(json.error || "Unable to submit inquiry right now.");
        setSubmitting(false);
        return;
      }

      const waUrl =
        json.whatsappUrl ||
        `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
          `Agentic AI Training Inquiry\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        )}`;
      setSubmittedUrl(waUrl);
      toast.success("Training inquiry emailed to our team! Opening WhatsApp as well.");
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error("Network error sending inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-[#FBE0D4] bg-white rounded-2xl shadow-sm p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center text-[#141210] mb-2">Get Program Details</h2>
      <p className="text-sm text-center text-stone-600 mb-6">
        Send your details directly via email to receive the syllabus and upcoming cohort dates.
      </p>

      {submittedUrl && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs text-emerald-900 flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-600" /> Inquiry emailed to our team!
          </span>
          <TrackedLink
            href={submittedUrl}
            target="_blank"
            rel="noopener noreferrer"
            track={{ kind: "contact", channel: "whatsapp", sourcePage: "/services/agentic-ai-training" }}
            className="font-semibold text-[#FF5422] underline"
          >
            Continue on WhatsApp →
          </TrackedLink>
        </div>
      )}

      <form onSubmit={handleInquiry} className="space-y-4">
        <div>
          <Label htmlFor="t-name">Full Name</Label>
          <Input
            id="t-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="t-email">Email Address</Label>
            <Input
              id="t-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label htmlFor="t-phone">Phone / WhatsApp</Label>
            <Input
              id="t-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="t-msg">Goals / Questions</Label>
          <Textarea
            id="t-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you want to learn..."
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-[#FF5422] hover:bg-[#e8460e] text-white"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Inquiry...
            </>
          ) : (
            <>
              Send Inquiry via Email <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

export function ReferWhatsAppButton({
  label = "Refer Someone Now",
  className,
  showArrow = false,
}: {
  label?: string;
  className?: string;
  showArrow?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg" className={className}>
        {label}
        {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
      <ModalEnquiryDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Refer a Client or Project"
        subtitle="Submit your contact info and referred client details straight to our partner email desk."
        category="partner-referral"
        defaultMessageLabel="Referred Contact & Project Scope"
        defaultMessagePlaceholder="Referred person's name, phone/company, and website/software/AI need..."
        sourcePage="/services/refer"
        directWhatsAppText="Hi, I'd like to refer someone for dieVekter software or AI services."
      />
    </>
  );
}
