import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SiteFooter } from "@/components/dv/SiteFooter";
import { SiteNav } from "@/components/dv/SiteNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { OFFICE_LOCATIONS, SITE_CONFIG } from "@/config/site";
import { getLocationBySlug, LOCATION_PROFILES } from "@/data/locationDetails";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildLocationBranchSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LOCATION_PROFILES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = getLocationBySlug(slug);
  if (!match) {
    return buildPageMetadata({
      path: `/locations/${slug}`,
      title: "Location Not Found",
      description: "The requested office location page could not be found.",
      noindex: true,
    });
  }

  return buildPageMetadata({
    path: match.office.locationPath,
    title: match.profile.seoTitle,
    description: match.profile.seoDescription,
  });
}

export default async function OfficeLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = getLocationBySlug(slug);
  if (!match) notFound();

  const { office, profile } = match;
  const siblingOffices = OFFICE_LOCATIONS.filter((loc) => loc.slug !== office.slug);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#141210]">
      <JsonLd
        nodes={[
          buildLocationBranchSchema(office, profile.surroundingAreas),
          buildWebPageSchema({
            title: profile.seoTitle,
            description: profile.seoDescription,
            path: office.locationPath,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: office.city, path: office.locationPath },
          ]),
        ]}
      />

      <SiteNav />

      <main className="flex-grow pt-24">
        <section className="dv-dot-bg py-14 sm:py-20">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="inline-flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                <li>
                  <Link href="/" className="hover:text-[#FF5422]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </li>
                <li>
                  <Link href="/locations" className="hover:text-[#FF5422]">
                    Locations
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </li>
                <li className="font-medium text-[#141210]">{office.city}</li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5422] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  {office.slug === "radhanagari" ? (
                    <Building2 className="h-3 w-3" />
                  ) : (
                    <MapPin className="h-3 w-3" />
                  )}
                  {office.badge} · PIN {office.postalCode}
                </span>

                <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-[#141210] leading-[1.08]">
                  {profile.heroHeading}
                </h1>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-600">
                  {profile.heroSummary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/contact?brief=${encodeURIComponent(`Meeting request for ${office.title}`)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF5422] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#e8460e] transition-colors"
                  >
                    Book Office Visit <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <TrackedLink
                    href={office.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-[#141210] hover:border-[#FF5422] hover:text-[#FF5422]"
                  >
                    <Navigation className="h-4 w-4 text-[#FF5422]" /> Open Directions
                  </TrackedLink>
                </div>
              </div>

              {/* NAP Verification Box matching GBP strictly */}
              <aside className="lg:col-span-5 rounded-3xl border border-[#FBE0D4] bg-white p-6 sm:p-7 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF5422] mb-2">
                  Verified Office Details
                </p>
                <h2 className="text-xl font-bold text-[#141210]">
                  {SITE_CONFIG.alternateName} — {office.city}
                </h2>
                <dl className="mt-4 space-y-3 text-sm text-stone-600">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Address
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-[#141210]">{office.address}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Office Hours
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#FF5422] shrink-0" />
                      {office.hours}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Phone &amp; WhatsApp
                    </dt>
                    <dd className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                      <TrackedLink
                        href={`tel:${SITE_CONFIG.telephoneE164}`}
                        track={{ kind: "contact", channel: "phone", sourcePage: office.locationPath }}
                        className="font-medium text-[#141210] hover:text-[#FF5422]"
                      >
                        {SITE_CONFIG.telephone}
                      </TrackedLink>
                      <span aria-hidden="true">·</span>
                      <TrackedLink
                        href={`tel:${SITE_CONFIG.secondaryTelephoneE164}`}
                        track={{ kind: "contact", channel: "phone", sourcePage: office.locationPath }}
                        className="font-medium text-[#141210] hover:text-[#FF5422]"
                      >
                        {SITE_CONFIG.secondaryTelephone}
                      </TrackedLink>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Email
                    </dt>
                    <dd className="mt-0.5">
                      <TrackedLink
                        href={`mailto:${SITE_CONFIG.email}`}
                        track={{ kind: "contact", channel: "email", sourcePage: office.locationPath }}
                        className="inline-flex items-center gap-1.5 font-medium text-[#FF5422] hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {SITE_CONFIG.email}
                      </TrackedLink>
                    </dd>
                  </div>
                  <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                    {SITE_CONFIG.legalName} · {SITE_CONFIG.udyam} · D-U-N-S {SITE_CONFIG.duns}
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* Embedded Google Map + Transit Context */}
        <section className="border-t border-stone-100 bg-white py-16">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-[#FBE0D4] bg-stone-100 shadow-sm">
                <iframe
                  title={`Google Map — ${office.title}`}
                  src={office.embedUrl}
                  width="600"
                  height="420"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[360px] sm:h-[420px] border-0"
                />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#141210]">
                    About Our {office.city} Center
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-600">
                    {profile.overviewParagraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#141210] mb-2">
                    Landmarks &amp; Transit Access
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-600">
                    {profile.landmarksAndTransit.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#FF5422] shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#141210] mb-2">Surrounding Areas Served</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.surroundingAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-[#FBE0D4] bg-[#FFF8F5] px-3 py-1 text-xs font-medium text-[#141210]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Branch Capabilities */}
        <section className="border-t border-stone-100 bg-[#FFF8F5] py-16">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141210] mb-8">
              Services Available at <span className="text-[#FF5422]">{office.city}</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {profile.focusVerticals.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-[#FBE0D4] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#FF5422]/45"
                >
                  <h3 className="text-lg font-bold text-[#141210] group-hover:text-[#FF5422] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-stone-600">{item.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#FF5422]">
                    Explore Service Hub <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {profile.localHighlights.map((hl) => (
                <div
                  key={hl.title}
                  className="rounded-2xl border border-[#FBE0D4] bg-white/90 p-5 text-sm"
                >
                  <p className="font-bold text-[#141210]">{hl.title}</p>
                  <p className="mt-1 text-stone-600 leading-relaxed">{hl.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location FAQs */}
        <section className="border-t border-stone-100 bg-white py-16">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141210] mb-6 text-center">
              {office.city} Office FAQs
            </h2>
            <FaqAccordion items={profile.faqs} tone="peach" />
          </div>
        </section>

        {/* Nearby Sibling Offices */}
        <section className="border-t border-stone-100 bg-[#FFF8F5] py-14">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="text-xl font-bold text-[#141210] mb-5">
              Nearby dieVekter Offices in Maharashtra
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {siblingOffices.map((sib) => (
                <Link
                  key={sib.id}
                  href={sib.locationPath}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[#FBE0D4] bg-white p-5 hover:border-[#FF5422] transition-colors"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF5422]">
                      {sib.badge}
                    </p>
                    <p className="font-bold text-[#141210] mt-0.5">{sib.title}</p>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">{sib.address}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#FF5422] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
