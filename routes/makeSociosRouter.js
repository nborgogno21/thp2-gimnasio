import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { socioSchema } from "../schemas/socioSchema.js";
import { idParamsSchema } from "../schemas/idParamsSchema.js";

export function makeSociosRouter({ sociosController, requireAuth }) {
  const router = Router();

  router.get("/", sociosController.listar);
  router.get("/:id", validate({ params: idParamsSchema }), sociosController.obtener);
  router.post("/", requireAuth, validate({ body: socioSchema }), sociosController.crear);
  router.put(
    "/:id",
    requireAuth,
    validate({ params: idParamsSchema, body: socioSchema }),
    sociosController.actualizar
  );
  router.delete("/:id", requireAuth, validate({ params: idParamsSchema }), sociosController.eliminar);

  return router;
}