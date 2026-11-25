import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import {
  LegalDocumentLayout,
  type LegalTocItem,
} from "@/components/legal/LegalDocumentLayout";
import { CookiePreferencesTrigger } from "@/components/layout/CookiePreferencesModal";
import { OFFICE_LOCATIONS, SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Privacy Policy";
const DESC =
  "How DIEVEKTER (dieVekter) collects, uses, retains, and safeguards personal information across www.dievekter.com, AI & software projects, Developer Toolkit utilities, and Study Abroad counselling.";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: TITLE,
  description: DESC,
});

const TOC: LegalTocItem[] = [
  { id: "scope", title: "1. What This Policy Covers" },
  { id: "categories", title: "2. Categories of Personal Information Collected" },
  { id: "sources", title: "3. How We Collect Information" },
  { id: "purposes", title: "4. Processing Purposes & Lawful Basis" },
  { id: "retention", title: "5. Consent, AI Usage & Data Retention" },
  { id: "sharing", title: "6. How We Share Information" },
  { id: "cookies", title: "7. Cookies & Preference Controls" },
  { id: "rights", title: "8. Your Rights & Identity Verification" },
  { id: "security", title: "9. Security, Third-Party Links & Children" },
  { id: "transfers", title: "10. International Transfers & Updates" },
  { id: "verification", title: "11. Enterprise Registrations" },
  { id: "contact", title: "12. Privacy Contact & Offices" },
];

const PROCESSING_MATRIX = [
  {
    purpose: "Responding to enquiries, project scoping & WhatsApp / email consultations",
    categories: "Contact identifiers; project or study goals",
    basis: "Legitimate interest in responding to requested consulting or admission guidance",
  },
  {
    purpose: "Delivering custom software, mobile apps, AI agents & billing/CRM deployments",
    categories: "Contact identifiers; commercial billing & milestone records; support logs",
    basis: "Contractual necessity under applicable Statement of Work (SOW)",
  },
  {
    purpose: "Study Abroad shortlisting, APS & university application checklist organization",
    categories: "Contact identifiers; student academic transcripts, test scores & preference inputs",
    basis: "Explicit applicant instruction & consent prior to advisory onboarding",
  },
  {
    purpose: "Sending updates, technical notices, security alerts & requested resources",
    categories: "Contact identifiers; communication preferences",
    basis: "Legitimate interest in service continuity; explicit consent where marketing applies",
  },
  {
    purpose: "Monitoring uptime, diagnosing latency & hardening API endpoints against abuse",
    categories: "Aggregated network telemetry; HTTP headers & rate-limit counters",
    basis: "Legitimate interest in platform security and fraud prevention",
  },
  {
    purpose: "Evaluating job & internship applications submitted by candidates",
    categories: "Contact identifiers; academic background, portfolio / GitHub & resume details",
    basis: "Legitimate interest in fair recruitment review (human-reviewed final decisions)",
  },
  {
    purpose: "Complying with statutory tax, accounting, or lawful enforcement requests",
    categories: "Relevant commercial invoices, verification records & written correspondence",
    basis: "Compliance with applicable Indian and international legal obligations",
  },
];

const GOVERNMENT_SOURCES = [
  {
    name: "Ministry of MSME — Udyam Registration Portal",
    identifier: `Registration No: ${SITE_CONFIG.udyam}`,
    url: "https://udyamregistration.gov.in/",
  },
  {
    name: "Dun & Bradstreet D-U-N-S Lookup",
    identifier: `D-U-N-S Number: ${SITE_CONFIG.duns}`,
    url: "https://www.dnb.com/",
  },
  {
    name: "Upwork Verified Agency / Freelancer Profile",
    identifier: `Profile: ${SITE_CONFIG.upworkProfileName}`,
    url: "https://www.upwork.com/",
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      path="/privacy"
      badge="Privacy & Data Governance"
      title="Privacy Policy"
      metaTitle={TITLE}
      description={DESC}
      lastUpdated="November 25, 2026"
      importantNote="The official language of all DIEVEKTER contracts and legal documents is English, which shall prevail in case of any translation. Our website and commercial services are intended for adults (18+); student minors applying for overseas education must participate with parent or legal guardian authorization."
      toc={TOC}
    >
      <section id="scope" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">1. What This Policy Covers</h2>
        <p>
          {SITE_CONFIG.legalName} (&ldquo;dieVekter&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) recognizes that personal privacy is fundamental. This Privacy Policy
          explains how we collect, use, disclose, and protect Personal Information when you visit{" "}
          <strong>www.dievekter.com</strong> (and redirected domains{" "}
          <strong>dievekter.com</strong> / <strong>dievekter.tech</strong>), contact our consulting
          and Study Abroad teams, use our browser-based Developer Toolkit, or engage our engineering
          and software services.
        </p>
        <p>
          When business clients deploy custom dieVekter software, AI agents, CRM pipelines, or
          retail billing platforms into their own operations (&ldquo;Customer Data&rdquo;), our
          obligations regarding end-user data held inside those systems are governed strictly by the
          client&apos;s direct agreement with us rather than this general website policy. Individuals
          seeking to exercise rights over Customer Data should direct their request to the
          applicable business client, and we will support our client promptly.
        </p>
      </section>

      <section id="categories" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          2. Categories of Personal Information Collected
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Contact Identifiers:</strong> Full name, email address, phone / WhatsApp number,
            company or institutional affiliation, and office region preferences.
          </li>
          <li>
            <strong>Account &amp; Commercial Information:</strong> Project proposals, scope records,
            support correspondence, workshop registrations, and billing status.
          </li>
          <li>
            <strong>Study Abroad Applicant Inputs:</strong> Target degree level, intake timeline,
            academic background summary, test score status, and destination preferences shared for
            counselling.
          </li>
          <li>
            <strong>Recruitment &amp; Internship Information:</strong> Portfolio / GitHub URLs,
            education summary, project history, and role applications submitted voluntarily.
          </li>
          <li>
            <strong>Internet &amp; Aggregate Usage Information:</strong> Browser type, device
            viewport metrics, approximate region, referring URL, pages viewed, and privacy-safe
            security/rate-limit telemetry. Note that tools in our Developer Toolkit (`/development-kit`)
            and Prompt Library execute locally in your browser.
          </li>
        </ul>
        <p className="text-xs text-stone-500">
          We do not request sensitive personal data (biometric identifiers, political opinions, or
          unrelated health records) on public site forms. Where formal Study Abroad filing requires
          passport or academic verification checklists, those files are collected only after direct
          onboarding with explicit consent.
        </p>
      </section>

      <section id="sources" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">3. How We Collect Information</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Directly when you submit our Contact enquiry form, WhatsApp link, or email brief.</li>
          <li>When you visit our Radhanagari, Kolhapur (Rajarampuri), or Phondaghat offices.</li>
          <li>When you register for AI training workshops, engineering cohorts, or internships.</li>
          <li>Indirectly via strictly necessary HTTP security logs and consented GA4 telemetry.</li>
        </ul>
      </section>

      <section id="purposes" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-bold text-[#141210]">
          4. Processing Purposes &amp; Lawful Basis
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#FFF8F5] border-b border-stone-200 text-[#141210]">
              <tr>
                <th className="p-3.5 font-bold">Processing Purpose</th>
                <th className="p-3.5 font-bold">Data Categories</th>
                <th className="p-3.5 font-bold">Lawful Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {PROCESSING_MATRIX.map((row) => (
                <tr key={row.purpose}>
                  <td className="p-3.5 font-medium text-[#141210] align-top">{row.purpose}</td>
                  <td className="p-3.5 text-stone-600 align-top">{row.categories}</td>
                  <td className="p-3.5 text-stone-600 align-top">{row.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="retention" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          5. Consent, AI Usage &amp; Data Retention
        </h2>
        <p>
          Where processing relies on consent under India&apos;s{" "}
          <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> or equivalent
          international laws, you may withdraw consent at any time without affecting prior lawful
          processing by updating Cookie Preferences or emailing{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#FF5422] underline">
            {SITE_CONFIG.email}
          </a>
          .
        </p>
        <p>
          <strong>AI in Operations &amp; Recruitment:</strong> While we engineer AI agents and
          workflow assistants for client systems, all hiring decisions, Study Abroad counselling
          judgments, and client contracts are reviewed and finalized by qualified human team
          members. Personal enquiry details are never used to train third-party public AI models.
        </p>
        <p>
          <strong>Retention:</strong> We retain enquiry records and contractual files only as long
          as needed to respond to your request, complete agreed services, satisfy statutory Indian
          accounting rules, or resolve disputes, after which records are deleted or anonymized.
        </p>
      </section>

      <section id="sharing" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">6. How We Share Information</h2>
        <p>
          <strong>We never sell or rent Personal Information.</strong> Information is shared only in
          strictly scoped circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Infrastructure &amp; Analytics Providers:</strong> Reputable hosting, email, and
            analytics infrastructure (such as Vercel edge delivery and Google Analytics when enabled)
            bound by confidentiality and security safeguards.
          </li>
          <li>
            <strong>University &amp; Visa Filing Assistance (Only At Applicant Request):</strong>{" "}
            Documents are submitted only to portals you explicitly approve (e.g., uni-assist or
            target university admissions portals).
          </li>
          <li>
            <strong>Legal &amp; Safety Obligations:</strong> Disclosures required to comply with
            valid legal process, prevent fraud/spam abuse, or enforce our{" "}
            <Link href="/terms" className="text-[#FF5422] underline">
              Terms of Service
            </Link>
            .
          </li>
        </ul>
      </section>

      <section id="cookies" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">7. Cookies &amp; Preference Controls</h2>
        <p>We categorize browser storage and cookies into four transparent classes:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Strictly Necessary Storage:</strong> Security headers, CSRF/validation checks,
            rate limiting, and saving your privacy preferences. Cannot be disabled.
          </li>
          <li>
            <strong>Performance &amp; Analytics Cookies:</strong> Aggregate GA4 traffic diagnostics
            (without storing raw contact form values inside analytics parameters).
          </li>
          <li>
            <strong>Functional Personalization:</strong> Browser memory inside utilities such as the
            Developer Toolkit or Study Abroad page filters.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Currently <strong>none used</strong> on
            www.dievekter.com.
          </li>
        </ul>
        <div className="pt-2">
          <CookiePreferencesTrigger className="inline-flex items-center gap-2 rounded-full border border-[#FBE0D4] bg-[#FFF8F5] px-4 py-2 text-xs font-semibold text-[#141210] hover:border-[#FF5422] hover:text-[#FF5422] transition-colors" />
        </div>
      </section>

      <section id="rights" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          8. Your Rights &amp; Identity Verification
        </h2>
        <p>
          Depending on your jurisdiction (including the India DPDP Act 2023, EEA/UK GDPR, or
          similar state privacy statutes), you have the right to request summary access to your
          personal data, correction of inaccurate entries, withdrawal of consent, erasure where no
          statutory retention duty applies, and non-discriminatory treatment when exercising
          privacy rights.
        </p>
        <p>
          Before fulfilling an access or deletion request, we verify identity via your registered
          email address or authorized representative documentation to safeguard against unauthorized
          disclosures.
        </p>
      </section>

      <section id="security" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          9. Security, Third-Party Links &amp; Children
        </h2>
        <p>
          All traffic across <strong>www.dievekter.com</strong> runs over HTTPS TLS with strict
          security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
          `Referrer-Policy`). External links—including DAAD, APS India, uni-assist, Embassies, and
          GitHub—are governed by their respective operators&apos; privacy policies once you navigate
          off our site.
        </p>
        <p>
          We do not knowingly collect personal information from children under 13 (or minors under
          18 without guardian involvement). Parents/guardians who believe information was submitted
          improperly may contact us immediately for prompt deletion.
        </p>
      </section>

      <section id="transfers" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          10. International Transfers &amp; Policy Updates
        </h2>
        <p>
          As we serve businesses globally and counsel students applying to European and
          international universities, limited technical telemetry or requested application records may
          transit global cloud edge nodes under standard security safeguards. Material revisions to
          this Privacy Policy will update the date displayed at the top of this page.
        </p>
      </section>

      <section id="verification" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210] flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#FF5422]" /> 11. Enterprise Registrations &amp;
          Verification
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-2">
          {GOVERNMENT_SOURCES.map((src) => (
            <a
              key={src.name}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-stone-200 bg-[#FFF8F5] p-4 hover:border-[#FF5422] transition-colors flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-bold text-[#141210]">{src.name}</p>
                <p className="text-[11px] font-mono text-[#FF5422] mt-1">{src.identifier}</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600">
                Verify portal <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-28 rounded-2xl border border-[#FBE0D4] bg-[#FFF8F5] p-6 space-y-3"
      >
        <h2 className="text-xl font-bold text-[#141210]">12. Privacy Contact &amp; Offices</h2>
        <p>
          To exercise any privacy right or contact our grievance/privacy desk, email{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[#FF5422] underline">
            {SITE_CONFIG.email}
          </a>{" "}
          or call/WhatsApp <strong>{SITE_CONFIG.telephone}</strong>.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs">
          {OFFICE_LOCATIONS.map((loc) => (
            <div key={loc.id} className="rounded-xl border border-[#FBE0D4] bg-white p-3.5">
              <p className="font-bold text-[#FF5422]">{loc.badge}</p>
              <p className="font-semibold text-[#141210] mt-0.5">{loc.city}</p>
              <p className="text-stone-600 mt-1">{loc.address}</p>
            </div>
          ))}
        </div>
      </section>
    </LegalDocumentLayout>
  );
}
