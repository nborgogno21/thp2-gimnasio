import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { inscripcionSchema } from "../schemas/inscripcionSchema.js";
import { idParamsSchema } from "../schemas/idParamsSchema.js";

export function makeInscripcionesRouter({ inscripcionesController, requireAuth }) {
  const router = Router();

  router.get("/", inscripcionesController.listar);
  router.get("/:id", validate({ params: idParamsSchema }), inscripcionesController.obtener);
  router.post("/", requireAuth, validate({ body: inscripcionSchema }), inscripcionesController.crear);
  router.delete("/:id", requireAuth, validate({ params: idParamsSchema }), inscripcionesController.eliminar);

  return router;
}