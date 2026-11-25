import type { MetadataRoute } from "next";
import { toAbsoluteUrl } from "@/config/site";
import { TECH_SERVICES_DATA } from "@/data/techServicesData";
import { BLOG_CATEGORIES, blogData, toIsoDateString } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const freshUpdateDate = new Date("2026-11-25");
  const coreStableDate = new Date("2026-10-25");

  const corePages: MetadataRoute.Sitemap = [
    { url: toAbsoluteUrl("/"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/services"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/study-abroad"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/study-abroad/germany"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/study-abroad/university-selection"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/study-abroad/admission-assistance"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/study-abroad/visa-guidance"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/study-abroad/student-resources"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/about"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/projects"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/portfolio"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/products"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/agents"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/solutions"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/solutions/ai"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/solutions/software"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/solutions/automation"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/ai-agents-library"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/development-kit"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/contact"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/locations"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/locations/radhanagari"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/locations/kolhapur"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/locations/phondaghat"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/blog"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/jobs"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/internship"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/privacy"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/terms"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/terms-of-use"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/support-policy"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/acceptable-use"), lastModified: freshUpdateDate },
    { url: toAbsoluteUrl("/services/agentic-ai-training"), lastModified: coreStableDate },
    { url: toAbsoluteUrl("/services/ai-training-workshops"), lastModified: coreStableDate },
  ];

  const servicePages: MetadataRoute.Sitemap = Object.keys(TECH_SERVICES_DATA).map((slug) => ({
    url: toAbsoluteUrl(`/services/${slug}`),
    lastModified: coreStableDate,
  }));

  const categoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: toAbsoluteUrl(`/blog/${cat.slug}`),
    lastModified: coreStableDate,
  }));

  const articlePages: MetadataRoute.Sitemap = blogData.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(toIsoDateString(post.updatedDate || post.date)),
  }));

  return [...corePages, ...servicePages, ...categoryPages, ...articlePages];
}
