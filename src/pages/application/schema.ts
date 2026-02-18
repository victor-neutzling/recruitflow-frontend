import { z } from "zod";

export const applicationFormSchema = z.object({
  title: z.string(),
  companyName: z.string(),
  position: z.string().optional(),
  salary: z.number().optional(),
  salaryType: z.enum(["expected", "offered"]).optional(),
  currency: z.string().optional(),
  workModel: z.enum(["remote", "hybrid", "onsite"]).optional(),
  regime: z.enum(["clt", "pj", "other"]).optional(),
  description: z.string().optional(),
  status: z.enum([
    "applied",
    "interview",
    "inProgress",
    "offer",
    "rejected",
    "accepted",
  ]),
  columnIndex: z.number(),
  appliedAt: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
