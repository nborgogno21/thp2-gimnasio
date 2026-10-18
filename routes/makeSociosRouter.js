import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { socioSchema } from "../schemas/socioSchema.js";
import { idParamsSchema } from "../schemas/idParamsSchema.js";

export function makeSociosRouter({ sociosController }) {
  const router = Router();

  router.get("/", sociosController.listar);
  router.get("/:id", validate({ params: idParamsSchema }), sociosController.obtener);
  router.post("/", validate({ body: socioSchema }), sociosController.crear);
  router.put(
    "/:id",
    validate({ params: idParamsSchema, body: socioSchema }),
    sociosController.actualizar
  );
  router.delete("/:id", validate({ params: idParamsSchema }), sociosController.eliminar);

  return router;
}