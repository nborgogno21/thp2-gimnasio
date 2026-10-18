import { Router } from "express";
import { getSociosDao } from "../dao/daoFactory.js";
import { makeSociosUseCases } from "../usecases/makeSociosUseCases.js";
import { makeSociosController } from "../controllers/makeSociosController.js";
import { makeSociosRouter } from "../routes/makeSociosRouter.js";

export async function buildContainer() {
  const sociosDao = getSociosDao();
  await sociosDao.init();

  const sociosUseCases = makeSociosUseCases({ sociosDao });
  const sociosController = makeSociosController({ sociosUseCases });

  const router = Router();
  router.use("/socios", makeSociosRouter({ sociosController }));
  return router;
}