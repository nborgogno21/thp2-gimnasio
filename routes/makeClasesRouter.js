import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { claseSchema } from "../schemas/claseSchema.js";
import { idParamsSchema } from "../schemas/idParamsSchema.js";

export function makeClasesRouter({ clasesController, requireAuth }) {
  const router = Router();

  router.get("/", clasesController.listar);
  router.get("/:id", validate({ params: idParamsSchema }), clasesController.obtener);
  router.post("/", requireAuth, validate({ body: claseSchema }), clasesController.crear);
  router.put(
    "/:id",
    requireAuth,
    validate({ params: idParamsSchema, body: claseSchema }),
    clasesController.actualizar
  );
  router.delete("/:id", requireAuth, validate({ params: idParamsSchema }), clasesController.eliminar);

  return router;
}