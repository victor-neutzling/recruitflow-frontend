import { z } from "zod";

export const filterFormSchema = z.object({
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  workModel: z.string().optional(),
  regime: z.string().optional(),
});

export type FilterFormData = z.infer<typeof filterFormSchema>;
