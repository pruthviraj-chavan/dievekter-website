import type { Metadata } from "next";
import { Building2, Code, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteNav } from "@/components/dv/SiteNav";
import { SiteFooter } from "@/components/dv/SiteFooter";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ContactEnquiryForm } from "@/components/forms/ContactEnquiryForm";
import { LocationsSection } from "@/components/home2/LocationsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { OFFICE_LOCATIONS, SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";

const TITLE = "Contact dieVekter | Software Development & Study Abroad Consultation";
const DESC =
  "Contact DieVekter Tech at our Head Office in Radhanagari or branches in Kolhapur (Rajarampuri) & Phondaghat via WhatsApp (+91 94048 95667), phone or email.";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: TITLE,
  description: DESC,
});

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#141210]">
      <JsonLd
        nodes={[
          buildWebPageSchema({
            title: TITLE,
            description: DESC,
            path: "/contact",
            pageType: "ContactPage",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          buildLocalBusinessSchema(),
        ]}
      />
      <SiteNav />
      <main className="flex-grow pt-24">
        <section className="dv-dot-bg relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#FF5422]/10 blur-3xl"
          />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
            <span className="inline-block rounded-full bg-[#FF5422] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-5">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141210] mb-5">
              Let&apos;s build or plan <span className="text-[#FF5422]">together.</span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Reach DieVekter Tech at our Radhanagari Head Office or our Kolhapur (Rajarampuri) and
              Phondaghat branches for custom software, AI agents &amp; web engineering or Study Abroad
              Consultancy.
            </p>
          </div>
        </section>

        <section className="border-t border-stone-100 bg-[#FFF8F5] py-16 sm:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-[#141210] mb-4">Direct Contact Channels</h2>
                <p className="text-stone-600 leading-relaxed mb-8">
                  Reach us directly by WhatsApp, phone, email, or visit one of our offices across
                  Radhanagari, Kolhapur, and Phondaghat.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF5422] text-white">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#141210]">WhatsApp Chat</h3>
                      <TrackedLink
                        href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent("Hi Dievekter Tech! I'd like to connect.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        track={{ kind: "contact", channel: "whatsapp", sourcePage: "/contact" }}
                        className="text-sm text-stone-600 hover:text-[#FF5422] transition-colors"
                      >
                        {SITE_CONFIG.telephone} (Direct WhatsApp)
                      </TrackedLink>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF5422] text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#141210]">Call Directly</h3>
                      <TrackedLink
                        href={`tel:${SITE_CONFIG.telephoneE164}`}
                        track={{ kind: "contact", channel: "phone", sourcePage: "/contact" }}
                        className="text-sm text-stone-600 hover:text-[#FF5422] transition-colors"
                      >
                        {SITE_CONFIG.telephone}
                      </TrackedLink>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF5422] text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#141210]">Email Us</h3>
                      <TrackedLink
                        href={`mailto:${SITE_CONFIG.email}`}
                        track={{ kind: "contact", channel: "email", sourcePage: "/contact" }}
                        className="text-sm text-stone-600 hover:text-[#FF5422] transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </TrackedLink>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF5422] text-white">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#141210]">Instagram</h3>
                      <a
                        href={SITE_CONFIG.sameAs[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-stone-600 hover:text-[#FF5422] transition-colors"
                      >
                        @dievekter_tech
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF5422] text-white">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#141210]">Head Office</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {OFFICE_LOCATIONS[0].address}
                      </p>
                      <p className="text-[11px] font-mono text-stone-500 mt-1">
                        {SITE_CONFIG.legalName} · Udyam: {SITE_CONFIG.udyam} · D-U-N-S:{" "}
                        {SITE_CONFIG.duns}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#141210] text-[#FF5422]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-[#141210]">Regional Branches</h3>
                      {OFFICE_LOCATIONS.slice(1).map((branch) => (
                        <div key={branch.id} className="text-xs text-stone-600 leading-relaxed">
                          <span className="font-semibold text-[#141210]">{branch.city}: </span>
                          {branch.address}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <ContactEnquiryForm />
            </div>
          </div>
        </section>

        <LocationsSection tone="light" id="office-maps" />
      </main>
      <SiteFooter />
    </div>
  );
}
