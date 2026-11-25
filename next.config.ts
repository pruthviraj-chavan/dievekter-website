import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/custom-website-development",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/services/ecommerce-solutions",
        destination: "/services/ecommerce-development",
        permanent: true,
      },
      {
        source: "/services/api-development",
        destination: "/services/api-integration",
        permanent: true,
      },
      {
        source: "/services/web-hosting",
        destination: "/services/cloud-solutions",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/favicon.ico.png",
        destination: "/icon-192.png",
        permanent: true,
      },
      {
        source: "/blog/category/:category",
        destination: "/blog/:category",
        permanent: true,
      },
      // Legacy 2025/early-2026 blog slugs redirected cleanly to updated 2026 guides or hubs
      {
        source: "/blog/agentic-ai-revolution-autonomous-agents-business",
        destination: "/blog/agentic-ai-vs-standard-chatbots-production-workflows-india",
        permanent: true,
      },
      {
        source: "/blog/agi-development-artificial-general-intelligence-business",
        destination: "/blog/artificial-intelligence",
        permanent: true,
      },
      {
        source: "/blog/multimodal-ai-future-human-computer-interaction",
        destination: "/blog/multilingual-voice-ai-whatsapp-assistants-english-hindi-marathi",
        permanent: true,
      },
      {
        source: "/blog/edge-ai-computing-intelligence-data-sources",
        destination: "/blog/artificial-intelligence",
        permanent: true,
      },
      {
        source: "/blog/ai-ethics-governance-responsible-systems-enterprise",
        destination: "/blog/rag-architecture-grounding-guardrails-enterprise-ai-systems",
        permanent: true,
      },
      {
        source: "/blog/quantum-computing-ai-computational-intelligence-frontier",
        destination: "/blog/artificial-intelligence",
        permanent: true,
      },
      {
        source: "/blog/ai-powered-cybersecurity-next-generation-threats",
        destination: "/blog/technology",
        permanent: true,
      },
      {
        source: "/blog/digital-transformation-ai-reshaping-business-models",
        destination: "/blog/technology",
        permanent: true,
      },
      {
        source: "/blog/future-work-human-ai-collaboration-modern-workplace",
        destination: "/blog/artificial-intelligence",
        permanent: true,
      },
      {
        source: "/blog/ai-driven-innovation-dievekter-accelerates-rd-product-development",
        destination: "/blog/wireframe-to-deployed-product-dievekter-ui-ux-engineering-sprint",
        permanent: true,
      },
      {
        source: "/blog/slack-data-migration-enterprise-workspace-transfer-guide",
        destination: "/blog/business-automation",
        permanent: true,
      },
      {
        source: "/blog/ai-billing-software-retail-stores-pos-systems",
        destination: "/blog/retail-billing-stock-control-software-vs-spreadsheets",
        permanent: true,
      },
      {
        source: "/blog/slack-microsoft-teams-migration-data-transfer-strategies",
        destination: "/blog/business-automation",
        permanent: true,
      },
      {
        source: "/blog/stock-management-software-small-business-features-benefits",
        destination: "/blog/retail-billing-stock-control-software-vs-spreadsheets",
        permanent: true,
      },
      {
        source: "/blog/enterprise-slack-export-backup-solutions-communication-data",
        destination: "/blog/business-automation",
        permanent: true,
      },
      {
        source: "/blog/ai-training-schools-preparing-students-future-artificial-intelligence-education",
        destination: "/blog/agentic-ai-workshops-colleges-educators-teams-maharashtra",
        permanent: true,
      },
      {
        source: "/blog/teacher-ai-training-programs-empowering-educators-artificial-intelligence-skills",
        destination: "/blog/agentic-ai-workshops-colleges-educators-teams-maharashtra",
        permanent: true,
      },
      {
        source: "/blog/custom-website-development-small-business-growth-strategies",
        destination: "/blog/custom-react-websites-vs-templates-technical-seo-indian-businesses",
        permanent: true,
      },
      {
        source: "/blog/ecommerce-website-development-trends-online-store-optimization",
        destination: "/blog/high-converting-ecommerce-storefronts-india-upi-checkout-speed",
        permanent: true,
      },
      {
        source: "/blog/mobile-app-development-react-native-flutter-cross-platform",
        destination: "/blog/react-native-vs-flutter-2026-indian-startup-sme-apps",
        permanent: true,
      },
      {
        source: "/blog/seo-optimization-strategies-small-business-google-ranking",
        destination: "/blog/technical-seo-local-search-blueprint-kolhapur-pune-maharashtra",
        permanent: true,
      },
      {
        source: "/blog/api-integration-development-connecting-business-systems-automation",
        destination: "/blog/custom-api-integrations-webhook-security-billing-crm-portals",
        permanent: true,
      },
    ];
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com",
      "style-src 'self' 'unsafe-inline' https://tagmanager.google.com https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders = [
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    const headersList = [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/fun",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/services/refer",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];

    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      headersList.push({
        source: "/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      });
    }

    return headersList;
  },
};

export default nextConfig;
