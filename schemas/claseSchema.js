import { z } from "zod";

export const claseSchema = z.object({
  nombre: z.string().min(1),
  instructor: z.string().min(1),
  dia: z.enum(["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]),
  horario: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  cupo: z.number().int().positive(),
});