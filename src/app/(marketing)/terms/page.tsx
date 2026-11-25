import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout, type LegalTocItem } from "@/components/legal/LegalDocumentLayout";
import { SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Terms of Service & Consultancy Disclosures";
const DESC =
  "Commercial Terms of Service governing DIEVEKTER custom software, AI systems & SaaS delivery, plus mandatory Study Abroad Consultancy & official embassy disclaimers.";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: TITLE,
  description: DESC,
});

const TOC: LegalTocItem[] = [
  { id: "identity", title: "1. Business Identity & Independence" },
  { id: "technology-scope", title: "2. Technology & Software Services Scope" },
  { id: "ip-commercials", title: "3. Milestones, Payment & IP Transfer" },
  { id: "study-abroad", title: "4. Study Abroad Consultancy Disclosures" },
  { id: "official-portals", title: "5. Official University & Visa Portals" },
  { id: "support-aup", title: "6. Support Policy & Acceptable Use" },
  { id: "liability", title: "7. Indemnification & Liability" },
  { id: "termination", title: "8. Term, Suspension & Law" },
];

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      path="/terms"
      badge="Terms of Service & Disclosures"
      title="Terms of Service"
      metaTitle={TITLE}
      description={DESC}
      lastUpdated="November 25, 2026"
      importantNote="Custom software engagements require a written Statement of Work (SOW). Study Abroad consultancy is strictly advisory — DIEVEKTER is a private Indian enterprise and has zero authority over university admissions or embassy visa decisions."
      toc={TOC}
    >
      <section id="identity" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          1. Business Identity &amp; Non-Government Status
        </h2>
        <p>
          {SITE_CONFIG.legalName} (&ldquo;dieVekter&rdquo;) is an Indian private business
          enterprise registered under the Ministry of MSME Udyam framework (Registration Number:{" "}
          <strong>{SITE_CONFIG.udyam}</strong>) with Head Office in Radhanagari, Kolhapur,
          Maharashtra and branches in Kolhapur (Rajarampuri) &amp; Phondaghat, listed with Dun
          &amp; Bradstreet (D-U-N-S: <strong>{SITE_CONFIG.duns}</strong>). We are not affiliated
          with, endorsed by, or acting on behalf of any government department, diplomatic mission,
          statutory university board, or APS authority.
        </p>
      </section>

      <section id="technology-scope" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          2. Technology, AI &amp; Software Services Scope
        </h2>
        <p>
          All website development, e-commerce engineering, mobile applications, AI voice/chat
          agents, RAG pipelines, CRM integrations, workflow automations, and SaaS deployments
          (including Smart Billing &amp; Stock, Attendance, and CRM tools) are governed by an agreed
          written proposal or Statement of Work (SOW) specifying deliverables, target timelines,
          acceptance criteria, and third-party API/cloud hosting responsibilities.
        </p>
      </section>

      <section id="ip-commercials" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          3. Milestones, Commercial Terms &amp; Intellectual Property
        </h2>
        <p>
          Unless expressly stated otherwise in an SOW, custom project deliverables and source
          repositories transfer to the client upon clearance of the applicable milestone invoices.
          DIEVEKTER retains ownership of pre-existing internal engineering frameworks, reusable UI
          primitives, and general know-how unless explicitly licensed or assigned in writing.
          Third-party API costs (e.g., LLM token APIs, WhatsApp Business APIs, cloud hosting tiers)
          remain the client&apos;s responsibility directly with respective providers.
        </p>
      </section>

      <section id="study-abroad" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          4. Study Abroad Consultancy Disclosures
        </h2>
        <p>
          Overseas education counselling, course shortlisting, Study in Germany roadmaps, Statement
          of Purpose / academic CV reviews, application organization, and visa file checklist
          assistance are strictly educational advisory services:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            All admission offers are decided solely by the admitting higher education institution.
          </li>
          <li>
            All National (Type D) student visas and residence decisions rest exclusively with the
            concerned Embassy or Consulate General.
          </li>
          <li>
            DIEVEKTER never sells fake admission letters, never writes fabricated statements, and
            never guarantees university admission or visa approval.
          </li>
          <li>
            Any applicable advisory fees depend cleanly on service scope and are disclosed in
            writing prior to enrollment.
          </li>
        </ul>
      </section>

      <section id="official-portals" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          5. Official University &amp; Visa Portals
        </h2>
        <p>
          Visa fee schedules, blocked account statutory amounts, APS India steps, and semester
          deadlines can change without notice by foreign authorities. Applicants must always cross-check
          final requirements on official primary websites (DAAD, APS India, uni-assist, and German
          Missions in India).
        </p>
      </section>

      <section id="support-aup" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          6. Support Policy &amp; Acceptable Use
        </h2>
        <p>
          Post-launch maintenance, uptime support tiers, and counselling hours are detailed in our{" "}
          <Link href="/support-policy" className="text-[#FF5422] underline">
            Support Policy
          </Link>
          . Prohibited technical, AI agent, and academic documentation conduct is defined in our{" "}
          <Link href="/acceptable-use" className="text-[#FF5422] underline">
            Acceptable Use Policy
          </Link>
          .
        </p>
      </section>

      <section id="liability" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          7. Indemnification &amp; Limitation of Liability
        </h2>
        <p>
          Clients and applicants indemnify DIEVEKTER against claims resulting from inaccurate
          information, unauthorized proprietary assets, or unverified third-party credentials
          supplied by them. Except in cases of willful misconduct, our aggregate contractual
          liability for any paid engagement shall not exceed the fees actually paid to DIEVEKTER
          under that specific engagement during the preceding 6 months.
        </p>
      </section>

      <section id="termination" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          8. Termination &amp; Legal Contact
        </h2>
        <p>
          Either party may terminate an active engagement per the notice period written inside its
          SOW or advisory agreement, subject to settlement for completed milestones. These terms are
          governed by the laws of India with jurisdiction in Kolhapur, Maharashtra. Contact{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[#FF5422] underline">
            {SITE_CONFIG.email}
          </a>{" "}
          with legal questions.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
