# Google Tag Manager, GA4 & Search Console Setup Guide

Follow these owner verification and analytics checks on **`https://www.dievekter.com`**.

---

## 1. Environment Variables (`Vercel` / `.env.local`)

Default container and measurement IDs are built into the codebase cleanly and can also be overridden via environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://www.dievekter.com
NEXT_PUBLIC_GTM_ID=GTM-NKRTP332
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XLDPHSXXCS
```

---

## 2. Google Tag Manager (`GTM-NKRTP332`) & GA4 (`G-XLDPHSXXCS`) Architecture

Implemented in `src/app/layout.tsx` and `src/lib/analytics/gtag.ts`:

- **GTM Container**: `https://www.googletagmanager.com/gtm.js?id=GTM-NKRTP332` + `<noscript>` iframe fallback (`https://www.googletagmanager.com/ns.html?id=GTM-NKRTP332`), permitted explicitly in `next.config.ts` Content Security Policy (`script-src`, `frame-src`, `connect-src`).
- **Consent Mode v2**: Default consent initialized before container start (`analytics_storage: 'granted'`, `functionality_storage: 'granted'`, `ad_storage: 'denied'`, `ad_user_data: 'denied'`, `ad_personalization: 'denied'`, `wait_for_update: 500`) and dynamically updated in `CookiePreferencesModal.tsx` with `consent_updated` dataLayer push.
- **PII Sanitization**: `sanitizeParams()` automatically strips `email`, `phone`, `mobile`, `name`, `full_name`, `message`, `user_email`, `user_phone`, and email-shaped search strings before sending any payload to `gtag()` or `window.dataLayer`.

### Tracked Events & Recommended GA4 Key Events

| Event Name | Trigger Scope | Parameters | Mark Key Event |
| :--- | :--- | :--- | :--- |
| `virtual_page_view` / `page_view` | Client route navigation (`AnalyticsRouteTracker.tsx`) | `page_path`, `page_location`, `page_title`, `content_group` | Built-in |
| `scroll_depth` | Passive scroll milestones | `depth` (`25`, `50`, `75`, `90`), `page`, `content_group` | No |
| `generate_lead` & `contact_submitted` | Valid enquiry submission (`/contact`) | `vertical`, `service_interest`, `channel`, `source_page` | **Yes** |
| `newsletter_subscribed` | Newsletter onboarding signup (`footer`, `/blog`) | `source`, `list_name`, `vertical_interest` | **Yes** |
| `whatsapp_click` | WhatsApp CTAs site-wide | `source_page`, `vertical` | **Yes** |
| `phone_click` / `email_click` | `tel:` / `mailto:` links | `source_page`, `vertical` | Recommended |
| `outbound_link_clicked` | External non-dievekter links | `link_url`, `link_text`, `page` | No |
| `form_started` / `form_submitted` / `form_error` | Contact & Newsletter forms | `form_name`, `form_location` / `error_type` | No |
| `search` | Debounced article search (`BlogArchiveClient`) | `search_term`, `search_location`, `results_count` | No |

---

## 3. Resend Email & Newsletter Lifecycle Setup

- **Enquiries, Careers & WhatsApp notifications**: Forwarded via `/api/contact`, `/api/enquiry`, `/api/careers`, and `/api/whatsapp-notify` to `ENQUIRY_FORWARD_EMAIL` (`info@dievekter.tech,info@dievekter.com`).
- **Newsletter Onboarding (`Email 1 — Immediate Welcome`)**: `/api/newsletter` sends an immediate branded onboarding email with topic-matched reading paths + 1-click unsubscribe notice to the subscriber via Resend, notifies the internal desk, and optionally syncs to a Resend Audience when `RESEND_AUDIENCE_ID` is configured.

---

## 4. Google Search Console & Bing Verification

1. Verify `dievekter.com` in **Google Search Console** via DNS TXT or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
2. Submit **`https://www.dievekter.com/sitemap.xml`** in **Indexing → Sitemaps** (and Bing Webmaster Tools).
3. Inspect priority money pages (`/`, `/services`, `/services/ai-agents`, `/study-abroad/germany`, `/locations/kolhapur`) with **URL Inspection → Test Live URL**.
