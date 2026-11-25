import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout, type LegalTocItem } from "@/components/legal/LegalDocumentLayout";
import { OFFICE_LOCATIONS, SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Support Policy";
const DESC =
  "DIEVEKTER official support channels, operating hours across Radhanagari, Kolhapur & Phondaghat, software SLA severity response targets, and Study Abroad counselling windows.";

export const metadata: Metadata = buildPageMetadata({
  path: "/support-policy",
  title: TITLE,
  description: DESC,
});

const TOC: LegalTocItem[] = [
  { id: "overview", title: "1. Support Coverage & Channels" },
  { id: "hours", title: "2. Regional Office & Desk Hours" },
  { id: "sla", title: "3. Software & AI Severity Response Matrix" },
  { id: "exclusions", title: "4. Warranty & Scope Boundaries" },
  { id: "study-abroad-support", title: "5. Study Abroad Applicant Support" },
  { id: "escalation", title: "6. Escalation & Contact" },
];

const SEVERITY_LEVELS = [
  {
    level: "P1 — Critical Production Outage",
    desc: "Live production application, storefront checkout, or client AI voice/chat gateway is completely unreachable for all users.",
    response: "Initial acknowledgment within 2 business hours (priority escalation via Phone/WhatsApp)",
  },
  {
    level: "P2 — Major Workflow Degradation",
    desc: "Core feature (e.g., CRM webhook sync, billing print/invoice flow, or lead form delivery) fails partially without full outage.",
    response: "Initial response within 4 business hours",
  },
  {
    level: "P3 — Minor Defect / UI Issue",
    desc: "Non-blocking visual defect, layout alignment detail, or secondary filter anomaly with a working workaround.",
    response: "Reviewed within 1 business day",
  },
  {
    level: "P4 — General Advisory & Feature Requests",
    desc: "Configuration questions, new enhancements, SEO content requests, or training follow-ups.",
    response: "Addressed within 1–2 business days",
  },
];

export default function SupportPolicyPage() {
  return (
    <LegalDocumentLayout
      path="/support-policy"
      badge="Service Level & Support"
      title="Support Policy"
      metaTitle={TITLE}
      description={DESC}
      lastUpdated="November 25, 2026"
      toc={TOC}
    >
      <section id="overview" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">1. Support Coverage &amp; Channels</h2>
        <p>
          DIEVEKTER provides structured technical support for active website, mobile app, custom
          software, AI agent, and retail SaaS clients, alongside scheduled guidance for onboarded
          Study Abroad students. Official support channels are:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Technical &amp; General Desk Email:</strong>{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#FF5422] underline">
              {SITE_CONFIG.email}
            </a>
          </li>
          <li>
            <strong>WhatsApp Support &amp; Quick Triage:</strong> {SITE_CONFIG.telephone}
          </li>
          <li>
            <strong>Direct Phone Line:</strong> {SITE_CONFIG.telephone} (for P1 urgency or scheduled
            reviews)
          </li>
        </ul>
      </section>

      <section id="hours" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-bold text-[#141210]">2. Regional Office &amp; Desk Hours</h2>
        <p>
          Standard support and counselling desks operate Monday through Saturday (excluding Indian
          public and state holidays):
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {OFFICE_LOCATIONS.map((loc) => (
            <div key={loc.id} className="rounded-2xl border border-[#FBE0D4] bg-[#FFF8F5] p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#FF5422]">
                {loc.badge}
              </p>
              <p className="font-bold text-[#141210] text-sm mt-1">{loc.title}</p>
              <p className="text-xs text-stone-600 mt-1">{loc.hours}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sla" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-bold text-[#141210]">
          3. Software &amp; AI Severity Response Matrix
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#FFF8F5] border-b border-stone-200 text-[#141210]">
              <tr>
                <th className="p-3.5 font-bold">Priority Level</th>
                <th className="p-3.5 font-bold">Criteria</th>
                <th className="p-3.5 font-bold">Target Response Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {SEVERITY_LEVELS.map((row) => (
                <tr key={row.level}>
                  <td className="p-3.5 font-semibold text-[#141210] align-top">{row.level}</td>
                  <td className="p-3.5 text-stone-600 align-top">{row.desc}</td>
                  <td className="p-3.5 font-medium text-[#FF5422] align-top">{row.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-stone-500">
          Target response times reflect initial engineering triage and mitigation plan initiation,
          subject to active maintenance agreements.
        </p>
      </section>

      <section id="exclusions" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">4. Warranty &amp; Scope Boundaries</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Post-Launch Warranty:</strong> Delivered custom builds include the warranty
            period agreed in your Statement of Work for reproducible regression fixes within the
            approved baseline scope.
          </li>
          <li>
            <strong>Excluded Causes:</strong> Incidents caused by unapproved manual edits to
            deployed codebases, expired client third-party credentials, DNS changes made outside our
            coordination, or upstream third-party vendor outages (cloud providers, WhatsApp Meta
            APIs, upstream LLM providers) fall outside fault warranty and are supported at agreed
            retainer rates.
          </li>
        </ul>
      </section>

      <section id="study-abroad-support" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">5. Study Abroad Applicant Support</h2>
        <p>
          Active Study Abroad &amp; Study in Germany applicants receive prioritized document
          checklist feedback aligned ahead of university portal cutoffs (e.g., Summer / Winter
          German intakes). Last-minute document review requests submitted within 48 hours of an
          external university deadline are handled strictly on a best-effort basis.
        </p>
      </section>

      <section id="escalation" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">6. Escalation &amp; Related Policies</h2>
        <p>
          For urgent escalations, call {SITE_CONFIG.telephone} or email{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[#FF5422] underline">
            {SITE_CONFIG.email}
          </a>{" "}
          referencing your project name. Review our{" "}
          <Link href="/terms" className="text-[#FF5422] underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/acceptable-use" className="text-[#FF5422] underline">
            Acceptable Use Policy
          </Link>
          .
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
