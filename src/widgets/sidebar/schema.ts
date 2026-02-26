import { z } from "zod";

export const filterFormSchema = z.object({
  salaryMin: z.coerce.number<number>().optional(),
  salaryMax: z.coerce.number<number>().optional(),
  workModel: z.string().optional(),
  regime: z.string().optional(),
});

export type FilterFormData = z.infer<typeof filterFormSchema>;
