import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../schemas/loginSchema.js";

export function makeAuthRouter({ authController }) {
  const router = Router();

  router.post("/login", validate({ body: loginSchema }), authController.login);

  return router;
}