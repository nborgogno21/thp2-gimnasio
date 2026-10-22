import { z } from "zod";

export const inscripcionSchema = z.object({
  socioId: z.number().int().positive(),
  claseId: z.number().int().positive(),
});