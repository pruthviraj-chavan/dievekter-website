import { z } from "zod";

export const NEWSLETTER_INTERESTS = ["all", "technology", "study_abroad"] as const;
export type NewsletterInterest = (typeof NEWSLETTER_INTERESTS)[number];

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(160, "Email address is too long")
    .transform((v) => v.toLowerCase()),
  name: z
    .string()
    .trim()
    .max(80, "Name cannot exceed 80 characters")
    .optional()
    .default(""),
  interest: z.enum(NEWSLETTER_INTERESTS).optional().default("all"),
  sourcePage: z.string().trim().max(180).optional().default("footer"),
  companyWebsite: z.string().max(200).optional(),
});

export type NewsletterPayload = z.infer<typeof newsletterSchema>;
