import { z } from "zod";

export const applicationFormSchema = z.object({
  title: z.string().optional(),

  companyName: z.string().min(1, "Company name is required"),

  position: z.string().min(1, "Position is required"),

  salary: z.string().optional(),
  salaryType: z.enum(["expected", "offered", ""]).optional(),
  currency: z.string().optional(),
  workModel: z.enum(["remote", "hybrid", "onsite", ""]).optional(),
  regime: z.enum(["clt", "pj", "other", ""]).optional(),
  description: z.string().optional(),
});

export const applicationLinkFormSchema = z.object({
  label: z.string().optional(),
  url: z.url("Invalid URL"),
});

export type ApplicationLinkFormData = z.infer<typeof applicationLinkFormSchema>;
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
