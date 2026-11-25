"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Building2,
  CheckCircle,
  Code,
  FileText,
  HeartHandshake,
  Layers,
  Loader2,
  Mail,
  MapPin,
  PenTool,
  Phone,
  Search,
  Send,
  Server,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/config/site";

const techJobs = [
  {
    id: 1,
    title: "Python Developer Intern",
    description: "Work with data-driven applications and machine learning pipelines.",
    location: "Remote",
    icon: Code,
  },
  {
    id: 2,
    title: "AI Engineer Intern",
    description: "Assist in building AI models, voice agents, and automation solutions.",
    location: "Hybrid",
    icon: Brain,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description: "Create user-friendly and engaging designs for web and mobile.",
    location: "On-site",
    icon: PenTool,
  },
  {
    id: 4,
    title: "Full Stack Developer",
    description: "Work across frontend and backend using React, TypeScript, and Node.",
    location: "Remote",
    icon: Layers,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description: "Manage cloud infrastructure and CI/CD deployment pipelines.",
    location: "Hybrid",
    icon: Server,
  },
];

const salesJobs = [
  {
    id: 6,
    title: "Lead Generation Specialist",
    description: "Identify potential clients and analyze market opportunities.",
    location: "Remote",
    icon: Users,
  },
  {
    id: 7,
    title: "Marketing Executive",
    description: "Plan and execute digital marketing campaigns across channels.",
    location: "On-site",
    icon: TrendingUp,
  },
  {
    id: 8,
    title: "Business Development Manager",
    description: "Drive partnerships and expansion across key industries.",
    location: "Hybrid",
    icon: Building2,
  },
  {
    id: 9,
    title: "Content Marketing Specialist",
    description: "Create engaging blog posts, videos, and case studies.",
    location: "Remote",
    icon: FileText,
  },
  {
    id: 10,
    title: "Customer Success Manager",
    description: "Ensure smooth onboarding and long-term client retention.",
    location: "Hybrid",
    icon: HeartHandshake,
  },
];

const ALL_ROLE_TITLES = [
  ...techJobs.map((j) => j.title),
  ...salesJobs.map((j) => j.title),
  "General / Open Application",
];

export function JobsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "tech" | "sales">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{
    role: string;
    whatsappUrl: string;
    emailSent: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    role: techJobs[0].title,
    name: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    portfolioUrl: "",
    resumeUrl: "",
    experience: "",
    message: "",
    companyWebsite: "",
  });

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  const filterList = (list: typeof techJobs) =>
    list.filter(
      (job) =>
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const openApplicationModal = (roleTitle: string, locationHint = "") => {
    setErrorMsg(null);
    setSubmittedInfo(null);
    setFormState((prev) => ({
      ...prev,
      role: roleTitle,
      location: prev.location || locationHint,
    }));
    setModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim()) {
      const msg = "Please enter your name, email address, and phone number.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationType: "job",
          sourcePage: "/jobs",
          ...formState,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        emailSent?: boolean;
        whatsappUrl?: string;
      };

      if (!res.ok || !data.ok) {
        const msg = data.error || "Unable to submit application right now.";
        setErrorMsg(msg);
        toast.error(msg);
        setIsSubmitting(false);
        return;
      }

      setSubmittedInfo({
        role: formState.role,
        emailSent: Boolean(data.emailSent),
        whatsappUrl:
          data.whatsappUrl ||
          `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
            `New Career Application (${formState.role}) — ${formState.name} (${formState.email})`,
          )}`,
      });
      toast.success("Application submitted! Details sent directly to our hiring desk.");
      setFormState((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        education: "",
        portfolioUrl: "",
        resumeUrl: "",
        experience: "",
        message: "",
        companyWebsite: "",
      }));
    } catch {
      setErrorMsg("Network error submitting application. Please try emailing or WhatsApp.");
      toast.error("Network error submitting application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="flex-grow pt-24 focus:outline-none">
      <section className="dv-dot-bg py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-4xl text-center">
          <span className="inline-block rounded-full bg-[#FF5422] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-5">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#141210] mb-5">
            Jobs – Join Our <span className="text-[#FF5422]">Team</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
            Join dieVekter and build AI agents, software, and automation systems that run in
            production. Submit applications directly via email through our career forms.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search open roles..."
                className="pl-10 rounded-full bg-white border-stone-200 focus-visible:ring-[#FF5422]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 shrink-0">
              {(["all", "tech", "sales"] as const).map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={categoryFilter === cat ? "default" : "outline"}
                  className={`rounded-full capitalize ${
                    categoryFilter === cat
                      ? "bg-[#FF5422] hover:bg-[#e8460e] text-white"
                      : "border-stone-200"
                  }`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-[#FFF8F5] py-16">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-16">
          {(categoryFilter === "all" || categoryFilter === "tech") && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141210] mb-8">
                Technology Roles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterList(techJobs).map((job) => (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-[#FBE0D4] bg-white p-6 flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:border-[#FF5422]/40 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#FF5422] text-white flex items-center justify-center">
                          <job.icon className="h-5 w-5" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#FBE0D4] bg-[#FFF8F5] text-stone-700"
                        >
                          <MapPin className="h-3 w-3 mr-1 text-[#FF5422]" />
                          {job.location}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-[#141210] mb-2">{job.title}</h3>
                      <p className="text-sm text-stone-600 mb-6">{job.description}</p>
                    </div>
                    <Button
                      onClick={() => openApplicationModal(job.title, job.location)}
                      variant="outline"
                      className="w-full rounded-full border-[#FBE0D4] hover:bg-[#FF5422] hover:text-white hover:border-[#FF5422]"
                    >
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(categoryFilter === "all" || categoryFilter === "sales") && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141210] mb-8">
                Sales &amp; Marketing Roles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterList(salesJobs).map((job) => (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-[#FBE0D4] bg-white p-6 flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:border-[#FF5422]/40 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#141210] text-white flex items-center justify-center">
                          <job.icon className="h-5 w-5 text-[#FF5422]" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#FBE0D4] bg-[#FFF8F5] text-stone-700"
                        >
                          <MapPin className="h-3 w-3 mr-1 text-[#FF5422]" />
                          {job.location}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-[#141210] mb-2">{job.title}</h3>
                      <p className="text-sm text-stone-600 mb-6">{job.description}</p>
                    </div>
                    <Button
                      onClick={() => openApplicationModal(job.title, job.location)}
                      variant="outline"
                      className="w-full rounded-full border-[#FBE0D4] hover:bg-[#FF5422] hover:text-white hover:border-[#FF5422]"
                    >
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="dv-dot-bg py-16">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="rounded-3xl border border-[#FBE0D4] bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141210] mb-3">Ready to Apply?</h2>
            <p className="text-stone-600 mb-6 text-sm sm:text-base">
              Don&apos;t see an exact fit? Send us your profile via our direct application form or
              reach out via email and phone.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Button
                onClick={() => openApplicationModal("General / Open Application")}
                className="rounded-full bg-[#FF5422] hover:bg-[#e8460e] text-white px-7"
              >
                <Send className="mr-2 h-4 w-4" /> Fill Open Application Form
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-stone-200"
                onClick={() => {
                  navigator.clipboard.writeText(SITE_CONFIG.email);
                  toast.success("Email copied to clipboard!");
                }}
              >
                <Mail className="mr-2 h-4 w-4 text-[#FF5422]" /> {SITE_CONFIG.email}
              </Button>
              <TrackedLink
                href={`tel:${SITE_CONFIG.secondaryTelephoneE164}`}
                track={{ kind: "contact", channel: "phone", sourcePage: "/jobs" }}
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-[#141210] hover:border-[#FF5422] hover:text-[#FF5422]"
              >
                <Phone className="mr-1.5 h-3.5 w-3.5 text-[#FF5422]" />
                {SITE_CONFIG.secondaryTelephone}
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="job-apply-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#FBE0D4] bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="inline-block rounded-full bg-[#FFF4F0] border border-[#FBE0D4] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF5422]">
                  Career Application
                </span>
                <h2 id="job-apply-heading" className="mt-2 text-2xl font-bold text-[#141210]">
                  {formState.role}
                </h2>
                <p className="mt-1 text-xs text-stone-500">
                  Your complete details are sent directly to our hiring email desk.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close application modal"
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-[#141210]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submittedInfo ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#141210]">Application Received!</h3>
                <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  {submittedInfo.emailSent
                    ? `Your application for ${submittedInfo.role} has been emailed directly to our hiring team.`
                    : `Your application details for ${submittedInfo.role} were prepared cleanly.`}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <TrackedLink
                    href={submittedInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    track={{ kind: "contact", channel: "whatsapp", sourcePage: "/jobs" }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#141210] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#FF5422] transition-colors"
                  >
                    Also Follow Up on WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                  </TrackedLink>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                    className="rounded-full"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="mt-5 space-y-4">
                <input
                  type="text"
                  name="companyWebsite"
                  value={formState.companyWebsite}
                  onChange={(e) => setFormState((p) => ({ ...p, companyWebsite: e.target.value }))}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="job-role" className="text-xs font-semibold text-[#141210]">
                      Position Applying For <span className="text-[#FF5422]">*</span>
                    </label>
                    <select
                      id="job-role"
                      value={formState.role}
                      onChange={(e) => setFormState((p) => ({ ...p, role: e.target.value }))}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm text-[#141210] focus:border-[#FF5422] focus:outline-none"
                    >
                      {ALL_ROLE_TITLES.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="job-name" className="text-xs font-semibold text-[#141210]">
                      Full Name <span className="text-[#FF5422]">*</span>
                    </label>
                    <Input
                      id="job-name"
                      required
                      placeholder="Your Full Name"
                      value={formState.name}
                      onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="job-email" className="text-xs font-semibold text-[#141210]">
                      Email Address <span className="text-[#FF5422]">*</span>
                    </label>
                    <Input
                      id="job-email"
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formState.email}
                      onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="job-phone" className="text-xs font-semibold text-[#141210]">
                      Phone / WhatsApp Number <span className="text-[#FF5422]">*</span>
                    </label>
                    <Input
                      id="job-phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="job-loc" className="text-xs font-semibold text-[#141210]">
                      City / Preferred Work Mode
                    </label>
                    <Input
                      id="job-loc"
                      placeholder="e.g., Kolhapur, Pune, Hybrid, Remote"
                      value={formState.location}
                      onChange={(e) => setFormState((p) => ({ ...p, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="job-portfolio" className="text-xs font-semibold text-[#141210]">
                      Portfolio / GitHub / LinkedIn URL
                    </label>
                    <Input
                      id="job-portfolio"
                      placeholder="https://github.com/... or linkedin.com/in/..."
                      value={formState.portfolioUrl}
                      onChange={(e) => setFormState((p) => ({ ...p, portfolioUrl: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="job-resume" className="text-xs font-semibold text-[#141210]">
                      Resume / CV Link (Google Drive / PDF URL)
                    </label>
                    <Input
                      id="job-resume"
                      placeholder="https://drive.google.com/..."
                      value={formState.resumeUrl}
                      onChange={(e) => setFormState((p) => ({ ...p, resumeUrl: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="job-exp" className="text-xs font-semibold text-[#141210]">
                      Experience, Tech Stack &amp; Projects
                    </label>
                    <Textarea
                      id="job-exp"
                      rows={2}
                      placeholder="Years of experience, core stack, key shipped work..."
                      value={formState.experience}
                      onChange={(e) => setFormState((p) => ({ ...p, experience: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="job-msg" className="text-xs font-semibold text-[#141210]">
                      Cover Note / Availability
                    </label>
                    <Textarea
                      id="job-msg"
                      rows={3}
                      placeholder="Notice period, current role, and why you'd like to build with dieVekter..."
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-full">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-[#FF5422] hover:bg-[#e8460e] text-white px-7"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
