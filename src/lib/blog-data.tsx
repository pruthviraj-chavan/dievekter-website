import { AI_AUTOMATION_BLOGS } from "@/data/blogs/aiAutomationBlogs";
import { STUDY_ABROAD_BLOGS } from "@/data/blogs/studyAbroadBlogs";
import { WEB_MOBILE_TECH_BLOGS } from "@/data/blogs/webMobileTechBlogs";

export type BlogCategorySlug =
  | "technology"
  | "website-development"
  | "mobile-app-development"
  | "artificial-intelligence"
  | "business-automation"
  | "study-abroad"
  | "study-in-germany";

export interface BlogCategoryInfo {
  slug: BlogCategorySlug;
  label: string;
  description: string;
}

export const BLOG_CATEGORIES: BlogCategoryInfo[] = [
  {
    slug: "study-in-germany",
    label: "Study in Germany",
    description:
      "Public university guides, APS India preparation, uni-assist steps and student visa documentation checklists.",
  },
  {
    slug: "study-abroad",
    label: "Study Abroad",
    description:
      "Profile evaluation, university shortlisting, SOP preparation and pre-departure readiness guides.",
  },
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    description:
      "Guides on agentic AI systems, voice assistants, RAG chatbots and AI literacy programs.",
  },
  {
    slug: "website-development",
    label: "Website Development",
    description:
      "Custom Next.js & React architecture, technical SEO foundations, performance optimization and conversion engineering.",
  },
  {
    slug: "mobile-app-development",
    label: "Mobile App Development",
    description:
      "Cross-platform React Native and Flutter engineering practices for reliable Android & iOS apps.",
  },
  {
    slug: "business-automation",
    label: "Business Automation",
    description:
      "Workflow orchestration, CRM pipelines, WhatsApp intake systems and retail stock control platforms.",
  },
  {
    slug: "technology",
    label: "Technology",
    description:
      "Broad software architecture, API security, UI/UX engineering sprints and product strategy insights.",
  },
];

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: BlogCategorySlug;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  updatedDate?: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  relatedPosts?: number[];
  relatedServices?: { label: string; path: string }[];
  officialReferences?: { name: string; url: string }[];
}

export function inferBlogCategory(post: BlogPost): BlogCategorySlug {
  if (post.category) return post.category;
  const hay = `${post.slug} ${post.title} ${post.tags.join(" ")}`.toLowerCase();
  if (hay.includes("germany")) return "study-in-germany";
  if (hay.includes("study abroad") || hay.includes("overseas")) return "study-abroad";
  if (hay.includes("mobile app") || hay.includes("react native") || hay.includes("flutter")) {
    return "mobile-app-development";
  }
  if (hay.includes("website") || hay.includes("e-commerce") || hay.includes("ecommerce") || hay.includes("seo")) {
    return "website-development";
  }
  if (hay.includes("automation") || hay.includes("crm") || hay.includes("billing") || hay.includes("stock")) {
    return "business-automation";
  }
  if (hay.includes("ai") || hay.includes("agentic") || hay.includes("rag") || hay.includes("voice")) {
    return "artificial-intelligence";
  }
  return "technology";
}

export function toIsoDateString(humanDate: string): string {
  const parsed = Date.parse(humanDate);
  if (Number.isNaN(parsed)) return "2026-11-25";
  return new Date(parsed).toISOString().split("T")[0];
}

export const blogData: BlogPost[] = [
  ...STUDY_ABROAD_BLOGS,
  ...AI_AUTOMATION_BLOGS,
  ...WEB_MOBILE_TECH_BLOGS,
].sort((a, b) => {
  const tA = Date.parse(a.updatedDate || a.date) || 0;
  const tB = Date.parse(b.updatedDate || b.date) || 0;
  return tB - tA;
});
