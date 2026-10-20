import { Router } from "express";
import { getSociosDao, getClasesDao } from "../dao/daoFactory.js";
import { makeSociosUseCases } from "../usecases/makeSociosUseCases.js";
import { makeClasesUseCases } from "../usecases/makeClasesUseCases.js";
import { makeSociosController } from "../controllers/makeSociosController.js";
import { makeClasesController } from "../controllers/makeClasesController.js";
import { makeSociosRouter } from "../routes/makeSociosRouter.js";
import { makeClasesRouter } from "../routes/makeClasesRouter.js";

export async function buildContainer() {
  const sociosDao = getSociosDao();
  const clasesDao = getClasesDao();
  await sociosDao.init();
  await clasesDao.init();

  const sociosUseCases = makeSociosUseCases({ sociosDao });
  const clasesUseCases = makeClasesUseCases({ clasesDao });

  const sociosController = makeSociosController({ sociosUseCases });
  const clasesController = makeClasesController({ clasesUseCases });

  const router = Router();
  router.use("/socios", makeSociosRouter({ sociosController }));
  router.use("/clases", makeClasesRouter({ clasesController }));
  return router;
}