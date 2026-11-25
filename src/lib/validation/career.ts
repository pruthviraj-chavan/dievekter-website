import { z } from "zod";

export const careerApplicationSchema = z.object({
  applicationType: z.enum(["job", "internship"]).default("job"),
  role: z.string().trim().min(2, "Please select or specify a role").max(140),
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(180),
  phone: z
    .string()
    .trim()
    .min(7, "Please provide a valid phone or WhatsApp number")
    .max(30),
  location: z.string().trim().max(120).optional().default(""),
  education: z.string().trim().max(180).optional().default(""),
  portfolioUrl: z.string().trim().max(300).optional().default(""),
  resumeUrl: z.string().trim().max(300).optional().default(""),
  experience: z.string().trim().max(2000).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  sourcePage: z.string().trim().max(120).optional().default("/jobs"),
  companyWebsite: z.string().max(120).optional().default(""),
});

export type CareerApplicationPayload = z.infer<typeof careerApplicationSchema>;
