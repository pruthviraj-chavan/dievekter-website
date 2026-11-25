import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout, type LegalTocItem } from "@/components/legal/LegalDocumentLayout";
import { SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Website Terms of Use";
const DESC =
  "Website Terms of Use governing access to www.dievekter.com, Developer Toolkit utilities, AI Playground previews, intellectual property, and acceptable conduct.";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms-of-use",
  title: TITLE,
  description: DESC,
});

const TOC: LegalTocItem[] = [
  { id: "acceptance", title: "1. Acceptance & Scope" },
  { id: "modifications", title: "2. Modifications to These Terms" },
  { id: "ip", title: "3. Trademarks & Intellectual Property" },
  { id: "utilities", title: "4. Developer Toolkit & Interactive Previews" },
  { id: "conduct", title: "5. Rules of Conduct & Anti-Abuse" },
  { id: "submissions", title: "6. Enquiries & Submitted Content" },
  { id: "third-party", title: "7. Third-Party & Official Portal Links" },
  { id: "disclaimer", title: "8. Disclaimers & Limitation of Liability" },
  { id: "copyright", title: "9. Copyright & Grievance Notice" },
  { id: "jurisdiction", title: "10. Governing Law & Jurisdiction" },
];

export default function WebsiteTermsOfUsePage() {
  return (
    <LegalDocumentLayout
      path="/terms-of-use"
      badge="Website Governance"
      title="Website Terms of Use"
      metaTitle={TITLE}
      description={DESC}
      lastUpdated="November 25, 2026"
      importantNote="These Website Terms of Use govern general browsing and free browser utilities on www.dievekter.com. Paid software development, SaaS licensing, and Study Abroad consultancy engagements are additionally governed by our Terms of Service and signed Statements of Work."
      toc={TOC}
    >
      <section id="acceptance" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">1. Acceptance &amp; Scope</h2>
        <p>
          By accessing, browsing, or using <strong>www.dievekter.com</strong> (collectively, the
          &ldquo;Site&rdquo;) operated by {SITE_CONFIG.legalName} (&ldquo;dieVekter&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to comply with these Website Terms of Use,
          our{" "}
          <Link href="/privacy" className="text-[#FF5422] underline">
            Privacy Policy
          </Link>
          , and our{" "}
          <Link href="/acceptable-use" className="text-[#FF5422] underline">
            Acceptable Use Policy
          </Link>
          . If you do not agree, please discontinue use of the Site immediately.
        </p>
      </section>

      <section id="modifications" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">2. Modifications to These Terms</h2>
        <p>
          We may update these Terms of Use periodically to reflect evolving legal standards,
          features, or documentation updates. Continued use of the Site after updated terms are
          posted constitutes acceptance of the revised version.
        </p>
      </section>

      <section id="ip" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          3. Trademarks &amp; Intellectual Property
        </h2>
        <p>
          The names &ldquo;dieVekter&rdquo;, &ldquo;DieVekter Tech&rdquo;, &ldquo;DIEVEKTER&rdquo;,
          brand artwork, editorial copy, software architecture diagrams, and original visual assets
          are owned by or licensed to DIEVEKTER. You may view and print articles solely for
          personal or internal informational reference, provided you do not remove copyright notices,
          repackage our content commercially, or mirror the Site without written permission.
        </p>
      </section>

      <section id="utilities" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          4. Developer Toolkit &amp; Interactive Previews
        </h2>
        <p>
          Browser utilities under `/development-kit` and interactive prompt previews under
          `/ai-agents-library` execute client-side convenience tools provided as-is for developer
          productivity and educational demonstration. Never rely solely on browser utilities for
          cryptographic compliance, production security audits, or regulated financial validation
          without independent engineering verification.
        </p>
      </section>

      <section id="conduct" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">5. Rules of Conduct &amp; Anti-Abuse</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Probe, scan, overwhelm, or bypass rate limits on `/api/contact`, `/api/enquiry`, or any
            Site endpoint.
          </li>
          <li>
            Use automated scrapers or spiders to harvest email addresses, copy bulk articles, or
            reproduce our Study Abroad guides cleanly under competing domains.
          </li>
          <li>
            Submit false, defamatory, malicious, or deceptive enquiries, or attempt injection or
            unauthorized access across any hosted component.
          </li>
        </ul>
      </section>

      <section id="submissions" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">6. Enquiries &amp; Submitted Content</h2>
        <p>
          When submitting project enquiries or feedback, you confirm the accuracy of details you
          provide and grant us permission to review and respond to those details for scoping or
          consultation purposes. Do not transmit third-party confidential source code or sensitive
          trade secrets until an NDA or mutual Statement of Work is executed.
        </p>
      </section>

      <section id="third-party" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          7. Third-Party &amp; Official Portal Links
        </h2>
        <p>
          We link to client project showcases and official educational/diplomatic portals (including
          DAAD, APS India, uni-assist, and German Missions in India) solely for user convenience. We
          do not control third-party availability or subsequent rule changes on external sites.
        </p>
      </section>

      <section id="disclaimer" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">
          8. Disclaimers &amp; Limitation of Liability
        </h2>
        <p>
          THIS SITE AND ITS FREE PUBLIC CONTENT, ARTICLES, AND DEVELOPER UTILITIES ARE PROVIDED
          &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS
          OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, DIEVEKTER SHALL NOT BE LIABLE FOR INDIRECT,
          INCIDENTAL, CONSEQUENTIAL, OR LOST-PROFIT DAMAGES ARISING OUT OF BROWSING OR RELYING ON
          GENERAL INFORMATION ON THIS SITE.
        </p>
      </section>

      <section id="copyright" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">9. Copyright &amp; Grievance Notice</h2>
        <p>
          If you believe any content displayed on www.dievekter.com infringes your intellectual
          property rights, please write with specific identification details to{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[#FF5422] underline">
            {SITE_CONFIG.email}
          </a>
          .
        </p>
      </section>

      <section id="jurisdiction" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-[#141210]">10. Governing Law &amp; Jurisdiction</h2>
        <p>
          These Terms of Use are governed by the laws of India, with exclusive jurisdiction subject
          to competent courts in Kolhapur, Maharashtra, India. See also our{" "}
          <Link href="/terms" className="text-[#FF5422] underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/support-policy" className="text-[#FF5422] underline">
            Support Policy
          </Link>
          .
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
