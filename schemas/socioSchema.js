const { z } = require("zod");

const socioSchema = z.object({
  nombre: z.string().min(1),
  dni: z.string().regex(/^\d{7,8}$/),
  email: z.string().email(),
  plan: z.enum(["mensual", "trimestral", "anual"]),
});

module.exports = { socioSchema };