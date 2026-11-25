import { OFFICE_LOCATIONS, type OfficeLocation } from "@/config/site";
import type { FaqSchemaItem } from "@/lib/seo/schema";

export interface LocationPageProfile {
  slug: OfficeLocation["slug"];
  seoTitle: string;
  seoDescription: string;
  heroHeading: string;
  heroSummary: string;
  overviewParagraphs: string[];
  surroundingAreas: string[];
  landmarksAndTransit: string[];
  focusVerticals: { title: string; summary: string; href: string }[];
  localHighlights: { title: string; note: string }[];
  faqs: FaqSchemaItem[];
}

export const LOCATION_PROFILES: Record<OfficeLocation["slug"], LocationPageProfile> = {
  radhanagari: {
    slug: "radhanagari",
    seoTitle: "Radhanagari Head Office — Software Engineering & Study Abroad Desk",
    seoDescription:
      "Visit DieVekter Tech Head Office on SH-179, Kolhapur-Radhanagari Rd (416212) for custom websites, mobile apps, AI agents, workflow automation & Study in Germany counselling.",
    heroHeading: "Software Engineering HQ & AI Lab in Radhanagari.",
    heroSummary:
      "Headquartered along State Highway 179 (Kolhapur–Radhanagari Road, PIN 416212), our Udyam-registered main office anchors custom full-stack software, AI agents, and overseas student mentoring across southern Maharashtra.",
    overviewParagraphs: [
      "DIEVEKTER operates its primary technical engineering studio, product R&D workspace, and central advisory administration right out of Radhanagari in Kolhapur district, Maharashtra. Established with verified Indian MSME registration (UDYAM-MH-15-0320983) and D-U-N-S recognition (312163123), the Radhanagari HQ houses our lead software engineers and AI architects serving businesses across Maharashtra, Pune, Mumbai, and international remote clients.",
      "Alongside custom web platforms, React Native & Flutter applications, retail billing/inventory systems, and multilingual AI agents, our Radhanagari hub supports local engineering graduates, polytechnic diploma holders, and regional SME founders with structured workshops and Study in Germany guidance without forcing long-distance travel to metro cities.",
    ],
    surroundingAreas: [
      "Radhanagari",
      "Dhamod",
      "Rashiwade",
      "Saravade",
      "Gargoti",
      "Kagal Corridor",
      "Kolhapur South",
    ],
    landmarksAndTransit: [
      "Located directly on SH-179 (Kolhapur–Radhanagari Highway) with accessible two-wheeler and four-wheeler roadside parking.",
      "Direct MSRTC bus and state highway connectivity toward Rankala / Kolhapur City (approx. 45–55 minutes) and Dajipur / Phondaghat ghat route toward Sindhudurg.",
      "Open Monday through Saturday from 09:30 AM to 07:00 PM IST for scheduled technical discoveries and student document audits.",
    ],
    focusVerticals: [
      {
        title: "Full-Stack Websites, Apps & Custom Retail Software",
        summary:
          "Architecture sprints, Next.js SSR web platforms, mobile apps, GST/stock software, and automated WhatsApp & CRM pipelines.",
        href: "/services",
      },
      {
        title: "Agentic AI, RAG Assistants & Enterprise Integrations",
        summary:
          "Multilingual voice and WhatsApp assistants in Marathi, Hindi, and English paired with verified REST APIs and webhook workflows.",
        href: "/services/ai-agents",
      },
      {
        title: "Study in Germany & Overseas Counselling",
        summary:
          "Module matching, APS India documentation sequencing, uni-assist checklists, and honest shortlisting for engineering and IT graduates.",
        href: "/study-abroad/germany",
      },
    ],
    localHighlights: [
      {
        title: "Zero-Intermediary Founder Access",
        note: "Work directly with architects who scope, design, and deploy production code — avoiding subcontracting delays.",
      },
      {
        title: "Hands-On Campus & Educator Workshops",
        note: "Starting point for our regional college and high-school Agentic AI and software literacy sessions across southern Kolhapur and Konkan.",
      },
    ],
    faqs: [
      {
        question: "Do I need an appointment before visiting the Radhanagari Head Office?",
        answer:
          "Walk-in enquiries are welcome during Mon–Sat hours (09:30 AM – 07:00 PM IST), though booking a slot via /contact or +91 94048 95667 ensures our lead software architect or Study Abroad advisor is available uninterrupted.",
      },
      {
        question: "Does the Radhanagari office serve businesses in Pune, Mumbai, or outside India?",
        answer:
          "Yes. Our Radhanagari headquarters serves regional Maharashtra businesses alongside clients across Pune, Mumbai, pan-India, Europe, and North America through structured weekly video sprints.",
      },
    ],
  },
  kolhapur: {
    slug: "kolhapur",
    seoTitle: "Kolhapur Rajarampuri Office — Web, AI & Study Abroad Counselling",
    seoDescription:
      "Visit DieVekter Tech Kolhapur branch near Chitale Express, Sunlee Towers 3rd Floor, Rajarampuri 10th Lane (416008) for software consulting & Study in Germany guidance.",
    heroHeading: "Software Studio & Study Abroad Desk in Rajarampuri, Kolhapur.",
    heroSummary:
      "Positioned in the heart of Kolhapur's commercial and student corridor at Sunlee Towers, 3rd Floor, Rajarampuri 10th Lane (PIN 416008), serving local enterprises, retail founders, and Shivaji University & engineering aspirants.",
    overviewParagraphs: [
      "Our Kolhapur city office in Rajarampuri E Ward places face-to-face technical strategy and Study Abroad mentoring within walking distance of major coaching centers, banks, notary services, and engineering hostels. Local businesses across Kolhapur — from manufacturing units in Shiroli and Gokul Shirgaon MIDC to retail brands and service firms — meet our team here for custom websites, technical SEO, billing software, and WhatsApp CRM automation.",
      "Several real platforms highlighted in our shipped portfolio serve Kolhapur audiences directly, including Jaihind Electricals, Mahaa Connect News, VFA Gym, and The Eventors. On the education side, B.E., B.Tech, BCA, and B.Sc students from across Kolhapur visit Rajarampuri for transcript reviews, Modified Bavarian Formula credit audits, APS checklists, and un-biased German public university shortlisting.",
    ],
    surroundingAreas: [
      "Rajarampuri",
      "Shahupuri",
      "Tarabai Park",
      "Ruikar Colony",
      "Shiroli MIDC",
      "Gokul Shirgaon",
      "Ichalkaranji",
      "Sangli",
    ],
    landmarksAndTransit: [
      "Located at Sunlee Towers, 3rd Floor, Rajarampuri 10th Lane right near Chitale Xpress along the main Rajarampuri bus route.",
      "Approximately 10–12 minutes from Kolhapur Railway Station (CSMT Kolhapur) and Central Bus Stand (CBS) via Shahupuri.",
      "Dedicated evening hours until 07:00 PM IST Mon–Sat to accommodate working professionals and college students after lectures.",
    ],
    focusVerticals: [
      {
        title: "Study in Germany & European Admissions Desk",
        summary:
          "Transcript reviews, SOP/Europass CV mentoring, uni-assist VPD checklists, Sperrkonto planning, and Type D visa file organization.",
        href: "/study-abroad/germany",
      },
      {
        title: "Kolhapur Website Design & Technical Local SEO",
        summary:
          "Fast Next.js business websites, e-commerce catalogs with UPI checkout, Google Business alignment, and Multi-Branch schema engineering.",
        href: "/services/seo-optimization",
      },
      {
        title: "MIDC Retail Billing, Inventory & CRM Workflows",
        summary:
          "Replace manual spreadsheets across industrial distributors and city showrooms with multi-branch inventory and WhatsApp lead routing.",
        href: "/services/business-automation",
      },
    ],
    localHighlights: [
      {
        title: "Proven Kolhapur Shipped Portfolio",
        note: "Explore live Kolhapur client launches such as Jaihind Electricals and Mahaa Connect News across mobile and desktop on our Projects showcase.",
      },
      {
        title: "Zero-Commission Study Abroad Shortlisting",
        note: "Students receive transparent course-module alignment across German public Universitäten and Hochschulen rather than commission-driven lists.",
      },
    ],
    faqs: [
      {
        question: "How do I reach the Kolhapur Rajarampuri branch from CBS or Railway Station?",
        answer:
          "Take any auto or city bus heading onto Rajarampuri Main Bus Route toward 10th Lane near Chitale Express; our office is inside Sunlee Towers on the 3rd Floor.",
      },
      {
        question: "Can Kolhapur businesses schedule on-site requirements discovery at their shop or MIDC factory?",
        answer:
          "Yes — after an initial brief at Rajarampuri or over call (+91 94048 95667 / +91 86004 69912), our team conducts workflow walkthroughs on-site for Kolhapur, Shiroli, and Gokul Shirgaon clients.",
      },
    ],
  },
  phondaghat: {
    slug: "phondaghat",
    seoTitle: "Phondaghat Branch — Konkan & Sindhudurg Tech & Study Abroad Center",
    seoDescription:
      "Visit DieVekter Tech at Gandhi Chowk near Lokmanya Multipurpose Bank, Patelwadi, Phondaghat (416601) for websites, AI training workshops & Study Abroad guidance.",
    heroHeading: "Technology Consulting & Student Guidance in Phondaghat.",
    heroSummary:
      "Centrally situated at Gandhi Chowk near Lokmanya Multipurpose Bank, Patelwadi, Phondaghat (PIN 416601), connecting Konkan, Kankavli, and Sindhudurg students and local enterprises directly with global software engineering and higher education support.",
    overviewParagraphs: [
      "Our Phondaghat center bridges the Konkan–Kolhapur corridor across Sindhudurg district, ensuring local entrepreneurs, educational trusts, tourism operators, and college students do not have to relocate or depend on unreliable middlemen for modern web platforms or authentic international admissions counselling.",
      "Deeply connected with the local academic and technical ecosystem — including web portals crafted for Phonda Education Society and Incite Computer Phondaghat — the Phondaghat branch provides in-person guidance for regional small businesses building digital storefronts, alongside workshops, internship onboarding, and Study Abroad document organization for students from Kankavli, Devgad, Malvan, Sawantwadi, and surrounding talukas.",
    ],
    surroundingAreas: [
      "Phondaghat",
      "Patelwadi",
      "Kankavli",
      "Vaibhavwadi",
      "Devgad",
      "Malvan",
      "Sawantwadi",
      "Sindhudurg",
    ],
    landmarksAndTransit: [
      "Right at Gandhi Chowk beside Lokmanya Multipurpose Bank in Patelwadi — easily recognized from main Phondaghat bus stand.",
      "Located along the Phondaghat–Kankavli–Radhanagari state highway link, serving travelers across Sindhudurg and western Kolhapur.",
      "Open Monday through Saturday from 10:00 AM to 06:30 PM IST for walk-in enquiries, student counselling, and internship check-ins.",
    ],
    focusVerticals: [
      {
        title: "Regional Business Websites & WhatsApp Booking",
        summary:
          "Clean, fast websites built for Sindhudurg schools, hospitality resorts, local traders, and regional service providers.",
        href: "/services/website-development",
      },
      {
        title: "School & Educator AI Workshops + Student Internships",
        summary:
          "Hands-on Python, TypeScript, and AI literacy workshops paired with real engineering project internships for Konkan students.",
        href: "/services/ai-training-workshops",
      },
      {
        title: "Study Abroad & Germany Document Organization",
        summary:
          "Help organizing academic transcripts, DigiLocker checks, APS readiness, and Europass CVs for Kankavli & Sindhudurg applicants.",
        href: "/study-abroad/admission-assistance",
      },
    ],
    localHighlights: [
      {
        title: "Delivered Digital Infrastructure in Phondaghat",
        note: "Our engineers have already delivered live websites for Phonda Education Society and Incite Computer Phondaghat.",
      },
      {
        title: "Local In-Person Review Without Metro Markups",
        note: "Sit face-to-face at Gandhi Chowk to review project prototypes or German visa checklists with direct follow-up via info@dievekter.com.",
      },
    ],
    faqs: [
      {
        question: "What hours is the Phondaghat branch open?",
        answer:
          "Our Phondaghat center at Gandhi Chowk operates Monday to Saturday, 10:00 AM to 06:30 PM IST. Call +91 94048 95667 or +91 86004 69912 before traveling from Kankavli or Devgad to reserve a dedicated slot.",
      },
      {
        question: "Can students in Sindhudurg apply for dieVekter internships or Study Abroad mentoring from Phondaghat?",
        answer:
          "Yes — students can apply online at /internship or visit Phondaghat for guided workshops and hybrid project onboarding with our engineering team.",
      },
    ],
  },
};

export function getLocationBySlug(slug: string): {
  office: OfficeLocation;
  profile: LocationPageProfile;
} | null {
  if (slug !== "radhanagari" && slug !== "kolhapur" && slug !== "phondaghat") {
    return null;
  }
  const office = OFFICE_LOCATIONS.find((loc) => loc.slug === slug);
  if (!office) return null;
  return {
    office,
    profile: LOCATION_PROFILES[slug],
  };
}
