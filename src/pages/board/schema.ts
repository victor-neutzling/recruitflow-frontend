import { z } from "zod";

export const applicationFormSchema = z.object({
  title: z.string().optional(),
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  position: z
    .string()
    .min(1, "Position is required")
    .min(2, "Position must be at least 2 characters"),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
