const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.dievekter.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export interface OfficeLocation {
  id: string;
  badge: string;
  title: string;
  city: string;
  address: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  lat: number;
  lng: number;
  hours: string;
  embedUrl: string;
  directionsUrl: string;
  highlights: string[];
}

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "radhanagari-hq",
    badge: "Head Office",
    title: "Radhanagari Engineering HQ",
    city: "Radhanagari",
    address: "SH-179, Kolhapur-Radhanagari Rd, Radhanagari, Maharashtra 416212",
    streetAddress: "SH-179, Kolhapur-Radhanagari Rd",
    locality: "Radhanagari",
    region: "Maharashtra",
    postalCode: "416212",
    lat: 16.410131,
    lng: 73.993576,
    hours: "Mon – Sat · 09:30 AM – 07:00 PM IST",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.2892256791583!2d73.99357637613181!3d16.410130984320165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc045a00a4cb8c5%3A0xf83bf8bad612c6f1!2sdievekter!5e0!3m2!1sen!2sin!4v1795613648308!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=16.410131,73.993576",
    highlights: [
      "Core Engineering & AI Agents Lab",
      "Primary Software & Enterprise Consulting",
      "Udyam Registered Enterprise Hub",
    ],
  },
  {
    id: "kolhapur-rajarampuri",
    badge: "Kolhapur City Branch",
    title: "Kolhapur — Rajarampuri Studio",
    city: "Kolhapur",
    address:
      "Near Chitale Express, Sunlee Towers, 3rd Floor, E Ward, Rajarampuri 10th Lane, Bus Route, Kolhapur- 416008, MH",
    streetAddress:
      "Near Chitale Express, Sunlee Towers, 3rd Floor, E Ward, Rajarampuri 10th Lane, Bus Route",
    locality: "Kolhapur",
    region: "Maharashtra",
    postalCode: "416008",
    lat: 16.692757,
    lng: 74.241822,
    hours: "Mon – Sat · 10:00 AM – 07:00 PM IST",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.682641287329!2d74.24182207613666!3d16.692757084080885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1016fe75c661d%3A0x8a7bd86a3b2f85f!2sChitale%20Xpress%20-%20Rajarampuri%2C%20Kolhapur!5e0!3m2!1sen!2sin!4v1795613755338!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=16.692757,74.241822",
    highlights: [
      "Study Abroad & Germany Counselling Desk",
      "Client Briefings & Strategy Sessions",
      "Easy Transit on Rajarampuri 10th Lane",
    ],
  },
  {
    id: "phondaghat-branch",
    badge: "Phondaghat Branch",
    title: "Phondaghat Counseling & Tech Center",
    city: "Phondaghat",
    address:
      "Gandhi Chowk, near Lokmanya Multipurpose Bank, Patelwadi, Phondaghat, Maharashtra 416601",
    streetAddress: "Gandhi Chowk, near Lokmanya Multipurpose Bank, Patelwadi",
    locality: "Phondaghat",
    region: "Maharashtra",
    postalCode: "416601",
    lat: 16.372275,
    lng: 73.792733,
    hours: "Mon – Sat · 10:00 AM – 06:30 PM IST",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.0331292910373!2d73.79273327613141!3d16.372274684351705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc039a51ce77e3d%3A0x51ba1b43a58853ef!2sIncite%20Computer%20Phondaghat!5e0!3m2!1sen!2sin!4v1795613741712!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=16.372275,73.792733",
    highlights: [
      "Sindhudurg & Konkan Regional Branch",
      "Web, AI Workshops & Student Guidance",
      "Central Landmark at Gandhi Chowk",
    ],
  },
];

export const SITE_CONFIG = {
  brandName: "dieVekter",
  alternateName: "DieVekter Tech",
  legalName: "DIEVEKTER",
  url: SITE_URL,
  defaultTitle: "dieVekter | Software Solutions & Study Abroad Consultancy",
  defaultDescription:
    "DieVekter Tech provides custom website development, mobile apps, AI agents, workflow automation and Study Abroad Consultancy across Radhanagari, Kolhapur, Phondaghat, Pune, India and globally.",
  email: "team.dievekter@gmail.com",
  telephone: "+91 94048 95667",
  telephoneE164: "+919404895667",
  whatsappNumber: "919404895667",
  whatsappUrl: "https://wa.me/919404895667",
  logo: `${SITE_URL}/dievektor_full_logo.png`,
  markLogo: `${SITE_URL}/dievektor_logo.png`,
  defaultOgImage: `${SITE_URL}/dievektor.png`,
  locale: "en_IN",
  city: "Radhanagari",
  district: "Kolhapur",
  region: "Maharashtra",
  country: "IN",
  postalCode: "416212",
  addressLine:
    "SH-179, Kolhapur-Radhanagari Rd, Radhanagari, Maharashtra 416212, India",
  udyam: "UDYAM-MH-15-0320983",
  duns: "312163123",
  upworkProfileName: "Pruthviraj C.",
  upworkUrl: "https://www.upwork.com/freelancers/pruthviraj?mp_source=share",
  sameAs: [
    "https://www.instagram.com/dievekter_tech/",
    "https://www.linkedin.com/company/dievekter",
    "https://github.com/dievekter",
  ],
  founders: [
    { name: "Pruthviraj Chavan", jobTitle: "Founder & President" },
    { name: "Zaid Nandaniwala", jobTitle: "CEO & MD" },
    { name: "Akash Sakhare", jobTitle: "CTO & AI Architect" },
  ],
  areaServed: [
    "Radhanagari",
    "Kolhapur",
    "Phondaghat",
    "Pune",
    "Maharashtra",
    "India",
    "Global",
  ],
  supportedServices: [
    "Website Development",
    "Mobile Application Development",
    "Custom Software Development",
    "E-commerce Solutions",
    "AI Agents & Voicebots",
    "AI Chatbots",
    "Business Automation",
    "CRM Automation",
    "API Development & Integrations",
    "Cloud & Backend Solutions",
    "UI/UX Design",
    "Study Abroad Consultancy",
    "Study in Germany Guidance",
  ],
} as const;

export function normalizePathname(pathname: string): string {
  const clean = pathname.split("#")[0].split("?")[0].trim();
  if (!clean || clean === "/") return "/";
  return `/${clean.replace(/^\/+|\/+$/g, "")}`;
}

export function toAbsoluteUrl(path: string): string {
  const normalized = normalizePathname(path);
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}
