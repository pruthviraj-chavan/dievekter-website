import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import Script from "next/script";
import { SITE_CONFIG, SITE_URL } from "@/config/site";
import { getGaMeasurementId, getGtmContainerId } from "@/lib/analytics/gtag";
import { AnalyticsRouteTracker } from "@/components/analytics/AnalyticsRouteTracker";
import { ClientToaster } from "@/components/layout/ClientToaster";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: "%s | dieVekter",
  },
  description: SITE_CONFIG.defaultDescription,
  applicationName: SITE_CONFIG.brandName,
  authors: [{ name: SITE_CONFIG.brandName, url: `${SITE_URL}/` }],
  creator: SITE_CONFIG.brandName,
  publisher: SITE_CONFIG.legalName,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    siteName: SITE_CONFIG.brandName,
    url: `${SITE_URL}/`,
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        alt: "dieVekter — Technology Solutions & Study Abroad Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    images: [SITE_CONFIG.defaultOgImage],
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? {
          other: {
            "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION,
          },
        }
      : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = getGaMeasurementId();
  const gtmId = getGtmContainerId();

  return (
    <html lang="en-IN" className={`${sansFont.variable} ${serifFont.variable} light`}>
      <body className="min-h-screen bg-white text-[#141210] antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[#141210] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF5422]"
        >
          Skip to main content
        </a>
        {children}
        <AnalyticsRouteTracker />
        <ClientToaster />

        {/* Google Tag Manager & GA4 Data Layer Initialization */}
        <Script id="dv-gtm-ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', {
  analytics_storage: 'granted',
  functionality_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
gtag('js', new Date());
gtag('config', '${gaId}');`}
        </Script>
        <Script
          id="dv-gtm-script"
          src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          strategy="afterInteractive"
        />
        <Script
          id="dv-ga4-script"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
