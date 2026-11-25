import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout, type LegalTocItem } from "@/components/legal/LegalDocumentLayout";
import { SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Acceptable Use Policy";
const DESC =
  "Acceptable Use Policy (AUP) governing DIEVEKTER websites, AI voice & chat agents, Developer Toolkit utilities, SaaS products, and authentic Study Abroad documentation standards.";

export const metadata: Metadata = buildPageMetadata({
  path: "/acceptable-use",
  title: TITLE,
  description: DESC,
});

const TOC: LegalTocItem[] = [
  { id: "purpose", title: "1. Purpose & Applicability" },
  { id: "security-abuse", title: "2. Prohibited Network & Technical Abuse" },
  { id: "ai-ethics", title: "3. Responsible AI & Automation Usage" },
  { id: "study-integrity", title: "4. Academic & Immigration Documentation Integrity" },
  { id: "enforcement", title: "5. Enforcement & Violation Reporting" },
];

export default function AcceptableUsePage() {
  return (
    <LegalDocumentLayout
      path="/acceptable-use"
      badge="Compliance & Ethics"
      title="Acceptable Use Policy"
      metaTitle={TITLE}
      description={DESC}
      lastUpdated="November 25, 2026"
      toc={TOC}
    >
      <section id="purpose" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">1. Purpose &amp; Applicability</h2>
        <p>
          This Acceptable Use Policy (&ldquo;AUP&rdquo;) applies to anyone accessing{" "}
          <strong>www.dievekter.com</strong>, using our free browser utilities (`/development-kit`,
          `/ai-agents-library`), licensing DIEVEKTER software products or AI workflows, or engaging
          our Study Abroad Consultancy services. Violation of this AUP constitutes a material breach
          of our{" "}
          <Link href="/terms" className="text-[#FF5422] underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-use" className="text-[#FF5422] underline">
            Website Terms of Use
          </Link>
          .
        </p>
      </section>

      <section id="security-abuse" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          2. Prohibited Network &amp; Technical Abuse
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            No unauthorized penetration testing, vulnerability scanning, DDoS attacks, credential
            stuffing, or attempts to circumvent authentication or rate limiting.
          </li>
          <li>
            No transmission of malware, ransomware, trojans, exploit payloads, or automated spam
            submissions through enquiry forms or APIs.
          </li>
          <li>
            No automated scraping or mirroring of DIEVEKTER articles, guides, or proprietary UI
            assets without written authorization.
          </li>
        </ul>
      </section>

      <section id="ai-ethics" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          3. Responsible AI &amp; Automation Usage
        </h2>
        <p>Clients deploying DIEVEKTER AI chatbots, voice agents, or workflow tools agree NOT to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Use voicebots or WhatsApp automation for unsolicited spam, illegal robocalling, financial
            fraud, phishing, or deceptive impersonation of individuals or public authorities.
          </li>
          <li>
            Bypass safety guardrails, human-escalation disclosures, or applicable telecom/WhatsApp
            Business messaging consent laws (including India TRAI DND regulations).
          </li>
          <li>
            Process sensitive regulated records inside AI workflows without disclosing the workflow
            properly in their own privacy notices.
          </li>
        </ul>
      </section>

      <section id="study-integrity" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          4. Academic &amp; Immigration Documentation Integrity
        </h2>
        <p>
          DIEVEKTER strictly upholds transparent, merit-based Study Abroad counselling. Under all
          circumstances, applicants and guardians must refrain from:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Submitting altered or fabricated academic transcripts, degree certificates, work
            experience letters, or language scorecards.
          </li>
          <li>
            Submitting falsified bank balances, blocked account proofs, or misleading visa statements
            for APS India, uni-assist, universities, or diplomatic missions.
          </li>
          <li>
            Requesting DIEVEKTER to fabricate fraudulent Statements of Purpose or Letters of
            Recommendation that misrepresent an applicant&apos;s real identity or history.
          </li>
        </ul>
        <p>
          Detection of falsified credentials will result in immediate termination of consultancy
          assistance without refund.
        </p>
      </section>

      <section id="enforcement" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          5. Enforcement &amp; Reporting Violations
        </h2>
        <p>
          We reserve the right to suspend API access, block abusive traffic, or terminate engagements
          involving violations of this AUP. Report security incidents or policy violations to{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[#FF5422] underline">
            {SITE_CONFIG.email}
          </a>
          .
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
