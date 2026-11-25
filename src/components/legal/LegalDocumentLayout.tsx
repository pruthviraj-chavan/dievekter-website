import Link from "next/link";
import { ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/dv/SiteNav";
import { SiteFooter } from "@/components/dv/SiteFooter";
import { FOOTER_LEGAL_LINKS } from "@/config/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/config/site";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export interface LegalTocItem {
  id: string;
  title: string;
}

export function LegalDocumentLayout({
  path,
  badge,
  title,
  metaTitle,
  description,
  lastUpdated,
  importantNote,
  toc,
  children,
}: {
  path: string;
  badge: string;
  title: string;
  metaTitle: string;
  description: string;
  lastUpdated: string;
  importantNote?: string;
  toc: LegalTocItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#141210]">
      <JsonLd
        nodes={[
          buildWebPageSchema({ title: metaTitle, description, path }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
        ]}
      />
      <SiteNav />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        {/* Hero */}
        <section className="dv-dot-bg py-12 sm:py-16 border-b border-stone-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="inline-flex items-center gap-1.5 text-xs text-stone-500">
                <li>
                  <Link href="/" className="hover:text-[#FF5422] transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </li>
                <li className="font-semibold text-[#141210]" aria-current="page">
                  {title}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5422] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-4">
                <ShieldCheck className="h-3.5 w-3.5" /> {badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141210] mb-4">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">{description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                <span>
                  <strong className="text-[#141210]">Last updated:</strong> {lastUpdated}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="text-[#141210]">Entity:</strong> {SITE_CONFIG.legalName} (
                  {SITE_CONFIG.brandName})
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="text-[#141210]">Governing Language:</strong> English
                </span>
              </div>

              {importantNote && (
                <div className="mt-5 rounded-2xl border border-[#FBE0D4] bg-[#FFF8F5] px-4 py-3 text-xs text-stone-700 leading-relaxed">
                  <strong className="text-[#141210]">Important Note:</strong> {importantNote}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Body Grid with Sticky Sidebar TOC */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              {/* Sticky Desktop Jump Rail */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                <div className="rounded-2xl border border-[#FBE0D4] bg-[#FFF8F5] p-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF5422] mb-3.5 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> On This Page
                  </h2>
                  <ul className="space-y-1.5 text-xs font-medium text-stone-700">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block rounded-lg px-2.5 py-1.5 hover:bg-white hover:text-[#FF5422] transition-colors"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 mb-3">
                    Legal &amp; Governance Policies
                  </h2>
                  <ul className="space-y-1.5 text-xs font-medium">
                    {FOOTER_LEGAL_LINKS.map((link) => {
                      const active = link.href === path;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "block rounded-lg px-2.5 py-1.5 transition-colors",
                              active
                                ? "bg-[#FF5422] text-white font-semibold"
                                : "text-stone-600 hover:bg-[#FFF8F5] hover:text-[#FF5422]",
                            )}
                          >
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>

              {/* Main Prose Sections */}
              <article className="lg:col-span-8 space-y-10 text-sm leading-relaxed text-stone-700">
                {children}
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
