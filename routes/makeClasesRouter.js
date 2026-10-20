import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { claseSchema } from "../schemas/claseSchema.js";
import { idParamsSchema } from "../schemas/idParamsSchema.js";

export function makeClasesRouter({ clasesController }) {
  const router = Router();

  router.get("/", clasesController.listar);
  router.get("/:id", validate({ params: idParamsSchema }), clasesController.obtener);
  router.post("/", validate({ body: claseSchema }), clasesController.crear);
  router.put(
    "/:id",
    validate({ params: idParamsSchema, body: claseSchema }),
    clasesController.actualizar
  );
  router.delete("/:id", validate({ params: idParamsSchema }), clasesController.eliminar);

  return router;
}