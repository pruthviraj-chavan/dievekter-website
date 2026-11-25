import {
  OFFICE_LOCATIONS,
  SITE_CONFIG,
  SITE_URL,
  toAbsoluteUrl,
} from "@/config/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface BreadcrumbNode {
  name: string;
  path: string;
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export function safeSerializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_CONFIG.brandName,
    alternateName: SITE_CONFIG.alternateName,
    legalName: SITE_CONFIG.legalName,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: SITE_CONFIG.logo,
    },
    image: SITE_CONFIG.defaultOgImage,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.telephoneE164,
    sameAs: [...SITE_CONFIG.sameAs],
    founder: SITE_CONFIG.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.jobTitle,
    })),
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "Udyam Registration Number",
        value: SITE_CONFIG.udyam,
      },
      {
        "@type": "PropertyValue",
        propertyID: "D-U-N-S Number",
        value: SITE_CONFIG.duns,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE_CONFIG.telephoneE164,
        email: SITE_CONFIG.email,
        areaServed: ["IN", "DE", "Global"],
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales and admissions",
        telephone: SITE_CONFIG.secondaryTelephoneE164,
        email: SITE_CONFIG.email,
        areaServed: ["IN", "DE", "Global"],
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
  };
}

export function buildLocalBusinessSchema() {
  const hq = OFFICE_LOCATIONS[0];
  const branches = OFFICE_LOCATIONS.slice(1);

  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_CONFIG.alternateName,
    alternateName: SITE_CONFIG.brandName,
    legalName: SITE_CONFIG.legalName,
    url: `${SITE_URL}/`,
    image: SITE_CONFIG.defaultOgImage,
    logo: SITE_CONFIG.logo,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.telephoneE164,
    parentOrganization: { "@id": ORG_ID },
    hasMap: hq.directionsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: hq.streetAddress,
      addressLocality: hq.locality,
      addressRegion: hq.region,
      postalCode: hq.postalCode,
      addressCountry: SITE_CONFIG.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hq.lat,
      longitude: hq.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: hq.openingHoursSpec.opens,
        closes: hq.openingHoursSpec.closes,
      },
    ],
    department: branches.map((branch) => ({
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${toAbsoluteUrl(branch.locationPath)}#business`,
      name: `${SITE_CONFIG.alternateName} — ${branch.city}`,
      url: toAbsoluteUrl(branch.locationPath),
      telephone: SITE_CONFIG.telephoneE164,
      email: SITE_CONFIG.email,
      hasMap: branch.directionsUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.streetAddress,
        addressLocality: branch.locality,
        addressRegion: branch.region,
        postalCode: branch.postalCode,
        addressCountry: SITE_CONFIG.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: branch.lat,
        longitude: branch.lng,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: branch.openingHoursSpec.opens,
          closes: branch.openingHoursSpec.closes,
        },
      ],
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology & Study Abroad Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Websites, Apps, AI Agents & Automation",
            description:
              "Next.js/React web development, mobile apps, multilingual AI chatbots & voicebots, custom retail billing software, CRM workflows and technical SEO.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Study Abroad & Study in Germany Consultancy",
            description:
              "Commission-free overseas education counselling, public/FH university shortlisting, APS India checklists, uni-assist filings and visa documentation guidance.",
          },
        },
      ],
    },
    areaServed: SITE_CONFIG.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    knowsAbout: [...SITE_CONFIG.supportedServices],
    sameAs: [...SITE_CONFIG.sameAs],
  };
}

export function buildLocationBranchSchema(
  office: (typeof OFFICE_LOCATIONS)[number],
  surroundingAreas: string[],
) {
  const url = toAbsoluteUrl(office.locationPath);
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${url}#business`,
    name: `${SITE_CONFIG.alternateName} — ${office.city} (${office.badge})`,
    url,
    image: SITE_CONFIG.defaultOgImage,
    logo: SITE_CONFIG.logo,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.telephoneE164,
    parentOrganization: { "@id": ORG_ID },
    hasMap: office.directionsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.locality,
      addressRegion: office.region,
      postalCode: office.postalCode,
      addressCountry: SITE_CONFIG.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.lat,
      longitude: office.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: office.openingHoursSpec.opens,
        closes: office.openingHoursSpec.closes,
      },
    ],
    areaServed: surroundingAreas.map((city) => ({
      "@type": "Place",
      name: `${city}, ${office.region}, India`,
    })),
    knowsAbout: [...SITE_CONFIG.supportedServices],
    sameAs: [...SITE_CONFIG.sameAs],
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_CONFIG.alternateName,
    alternateName: SITE_CONFIG.brandName,
    url: `${SITE_URL}/`,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
  pageType = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  pageType?: "WebPage" | "ContactPage" | "AboutPage";
}) {
  const url = toAbsoluteUrl(path);
  return {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbNode[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = ["Radhanagari", "Kolhapur", "Phondaghat", "Pune", "Maharashtra", "India", "Global"],
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    "@type": "Service",
    name,
    description,
    serviceType,
    url: toAbsoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: areaServed.map((nameItem) => ({
      "@type": "Place",
      name: nameItem,
    })),
  };
}

export function buildFaqSchema(faqs: FaqSchemaItem[]) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBlogPostingSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  authorName,
  image,
  section,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
  section?: string;
}) {
  const url = toAbsoluteUrl(path);
  return {
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image
      ? image.startsWith("http")
        ? image
        : toAbsoluteUrl(image)
      : SITE_CONFIG.defaultOgImage,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "en-IN",
    ...(section ? { articleSection: section } : {}),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": ORG_ID,
    },
  };
}
