# Technical SEO Implementation in Next.js 15

## 1. Native Metadata API (`src/lib/seo/metadata.ts` & `src/app/layout.tsx`)

- Global `metadataBase` in `src/app/layout.tsx` resolves against `NEXT_PUBLIC_SITE_URL` (`https://www.dievekter.com`), preventing preview URL leakage into canonical tags.
- Root template (`title: { default, template: "%s | dieVekter" }`) enforces consistent branding while supporting per-page overrides via `buildPageMetadata()`.
- `buildPageMetadata()` automatically sets:
  - Self-referencing `alternates.canonical` on all indexable routes (`https://www.dievekter.com...`).
  - `robots: { index: false, follow: false }` whenever `noindex: true` is passed (`/fun`, `/services/refer`, `/404`) **or** whenever `VERCEL_ENV` is set to a non-production environment (`preview`/`development`).
  - Complete OpenGraph (`website` / `article` with `publishedTime`, `modifiedTime`, `authors`, `section`) and Twitter `summary_large_image` cards.

## 2. Structured Data (`src/lib/seo/schema.ts` + `src/components/seo/JsonLd.tsx`)

- Rendered synchronously inside server HTML via `<JsonLd nodes={[...]} />` (`@context: "https://schema.org"`, `@graph: [...]`).
- `<` characters in JSON strings are escaped to `\u003c` inside `JsonLd.tsx` to prevent inline `<script>` injection edge cases.
- Verified schemas emitted:
  - `Organization` & `LocalBusiness` (`DIEVEKTER`, `UDYAM-MH-15-0320983`, `D-U-N-S: 312163123`, Radhanagari Head Office + Kolhapur & Phondaghat `department` entities with linked `@id`s, `hasOfferCatalog`, founders, phones, `info@dievekter.com`, social links).
  - `WebSite` with `/blog?q={search_term_string}` `SearchAction`.
  - `WebPage` + `BreadcrumbList` per route.
  - `Service` + `FAQPage` across `/services/[slug]`, `/study-abroad`, `/study-abroad/germany`, `/locations/[slug]`, and `/study-abroad/*` subpages.
  - `BlogPosting` across every article in `/blog/[slug]`.

## 3. Native Crawling Controls & Headers

- `src/app/sitemap.ts`: Programmatically indexes static core routes, multi-branch office location pages (`/locations`, `/locations/radhanagari`, `/locations/kolhapur`, `/locations/phondaghat`), legal & governance routes, 13 technology service pages, 7 blog category archives, and all 23 blog articles. Explicitly excludes `/fun`, `/services/refer`, `/api/*`, and `/404`.
- `src/app/robots.ts`: Explicitly permits `Googlebot`, `OAI-SearchBot`, `Claude-SearchBot`, and `PerplexityBot` for search/citation discovery, blocks `/api/` and utility routes (`/fun`, `/services/refer`), and points to `https://www.dievekter.com/sitemap.xml` (while blocking all paths automatically if `VERCEL_ENV` is non-production).
- `next.config.ts`: Sets `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, scoped `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `X-Robots-Tag: noindex, nofollow` HTTP response headers on `/fun`, `/services/refer`, and non-production Vercel previews.

## 4. Font & Image Optimization

- `next/font/google` loads `Plus_Jakarta_Sans` (`--font-sans`) and `Newsreader` (`--font-serif`) with `display: "swap"` directly from Next self-hosted font CSS — eliminating external font blocking requests.
- Editorial, portfolio, office location, and all 23 blog cover images (`public/images/blog/*.jpg`) use `next/image` with responsive `sizes` and local static optimization.
