import { Router } from "express";
import { getSociosDao, getClasesDao, getInscripcionesDao } from "../dao/daoFactory.js";
import { makeSociosUseCases } from "../usecases/makeSociosUseCases.js";
import { makeClasesUseCases } from "../usecases/makeClasesUseCases.js";
import { makeInscripcionesUseCases } from "../usecases/makeInscripcionesUseCases.js";
import { makeSociosController } from "../controllers/makeSociosController.js";
import { makeClasesController } from "../controllers/makeClasesController.js";
import { makeInscripcionesController } from "../controllers/makeInscripcionesController.js";
import { makeSociosRouter } from "../routes/makeSociosRouter.js";
import { makeClasesRouter } from "../routes/makeClasesRouter.js";
import { makeInscripcionesRouter } from "../routes/makeInscripcionesRouter.js";

export async function buildContainer() {
  const sociosDao = await getSociosDao();
  const clasesDao = await getClasesDao();
  const inscripcionesDao = await getInscripcionesDao();
  await sociosDao.init();
  await clasesDao.init();
  await inscripcionesDao.init();

  const sociosUseCases = makeSociosUseCases({ sociosDao });
  const clasesUseCases = makeClasesUseCases({ clasesDao });
  const inscripcionesUseCases = makeInscripcionesUseCases({
    inscripcionesDao,
    sociosDao,
    clasesDao,
  });

  const sociosController = makeSociosController({ sociosUseCases });
  const clasesController = makeClasesController({ clasesUseCases });
  const inscripcionesController = makeInscripcionesController({ inscripcionesUseCases });

  const router = Router();
  router.use("/socios", makeSociosRouter({ sociosController }));
  router.use("/clases", makeClasesRouter({ clasesController }));
  router.use("/inscripciones", makeInscripcionesRouter({ inscripcionesController }));
  return router;
}