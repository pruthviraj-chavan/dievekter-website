import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, Clock, MapPin, Phone } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SiteFooter } from "@/components/dv/SiteFooter";
import { SiteNav } from "@/components/dv/SiteNav";
import { LocationsSection } from "@/components/home2/LocationsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { OFFICE_LOCATIONS, SITE_CONFIG } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";

const TITLE = "Office Locations — Radhanagari HQ, Kolhapur & Phondaghat";
const DESC =
  "Visit DieVekter Tech offices in Radhanagari (Head Office), Kolhapur (Rajarampuri), and Phondaghat for custom websites, software, AI agents, and Study in Germany counselling.";

export const metadata: Metadata = buildPageMetadata({
  path: "/locations",
  title: TITLE,
  description: DESC,
});

export default function LocationsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#141210]">
      <JsonLd
        nodes={[
          buildLocalBusinessSchema(),
          buildWebPageSchema({ title: TITLE, description: DESC, path: "/locations" }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
          ]),
        ]}
      />
      <SiteNav />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-24 focus:outline-none">
        <section className="dv-dot-bg py-16 sm:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl text-center">
            <span className="inline-block rounded-full bg-[#FF5422] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-5">
              Our Regional Network
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141210] mb-5">
              Three offices across <span className="text-[#FF5422]">Maharashtra.</span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Meet our software engineers and Study Abroad advisors in person across Radhanagari,
              Kolhapur (Rajarampuri), and Phondaghat — or collaborate remotely from Pune, Mumbai,
              and worldwide.
            </p>
          </div>
        </section>

        <section className="border-t border-stone-100 bg-white py-16">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {OFFICE_LOCATIONS.map((office, idx) => (
                <article
                  key={office.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#FBE0D4] bg-[#FFF8F5] p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#FF5422]/45"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5422] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        {idx === 0 ? (
                          <Building2 className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        {office.badge}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-stone-500">
                        PIN {office.postalCode}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#141210]">{office.title}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-stone-600">{office.address}</p>

                    <div className="mt-4 space-y-1.5 text-xs text-stone-500">
                      <p className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#FF5422]" />
                        {office.hours}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-[#FF5422]" />
                        {SITE_CONFIG.telephone} · {SITE_CONFIG.secondaryTelephone}
                      </p>
                    </div>

                    <ul className="mt-5 space-y-1.5 border-t border-[#FBE0D4] pt-4 text-xs text-stone-700">
                      {office.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF5422] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5 pt-2">
                    <Link
                      href={office.locationPath}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#141210] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#FF5422]"
                    >
                      Explore {office.city} Office <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <TrackedLink
                      href={office.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-[#141210] hover:border-[#FF5422] hover:text-[#FF5422]"
                    >
                      Map
                    </TrackedLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LocationsSection tone="peach" id="interactive-maps" />
      </main>

      <SiteFooter />
    </div>
  );
}
