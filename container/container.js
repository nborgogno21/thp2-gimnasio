import { Router } from "express";
import { EventEmitter } from "node:events";
import { config } from "../config/config.js";
import { getSociosDao, getClasesDao, getInscripcionesDao } from "../dao/daoFactory.js";
import { consoleNotifier } from "../notifiers/consoleNotifier.js";
import { registerInscripcionListeners } from "../listeners/registerInscripcionListeners.js";
import { passwordHasher } from "../security/passwordHasher.js";
import { tokenService } from "../security/tokenService.js";
import { makeRequireAuth } from "../middlewares/requireAuth.js";
import { makeSociosUseCases } from "../usecases/makeSociosUseCases.js";
import { makeClasesUseCases } from "../usecases/makeClasesUseCases.js";
import { makeInscripcionesUseCases } from "../usecases/makeInscripcionesUseCases.js";
import { makeAuthUseCases } from "../usecases/makeAuthUseCases.js";
import { makeSociosController } from "../controllers/makeSociosController.js";
import { makeClasesController } from "../controllers/makeClasesController.js";
import { makeInscripcionesController } from "../controllers/makeInscripcionesController.js";
import { makeAuthController } from "../controllers/makeAuthController.js";
import { makeSociosRouter } from "../routes/makeSociosRouter.js";
import { makeClasesRouter } from "../routes/makeClasesRouter.js";
import { makeInscripcionesRouter } from "../routes/makeInscripcionesRouter.js";
import { makeAuthRouter } from "../routes/makeAuthRouter.js";

export async function buildContainer() {
  const sociosDao = await getSociosDao();
  const clasesDao = await getClasesDao();
  const inscripcionesDao = await getInscripcionesDao();
  await sociosDao.init();
  await clasesDao.init();
  await inscripcionesDao.init();

  const eventBus = new EventEmitter();
  registerInscripcionListeners({ eventBus, notifier: consoleNotifier });

  const requireAuth = makeRequireAuth({ tokenService });

  const sociosUseCases = makeSociosUseCases({ sociosDao, inscripcionesDao });
  const clasesUseCases = makeClasesUseCases({ clasesDao, inscripcionesDao });
  const inscripcionesUseCases = makeInscripcionesUseCases({
    inscripcionesDao,
    sociosDao,
    clasesDao,
    eventBus,
  });
  const authUseCases = makeAuthUseCases({
    passwordHasher,
    tokenService,
    adminUser: config.adminUser,
    adminPasswordHash: config.adminPasswordHash,
  });

  const sociosController = makeSociosController({ sociosUseCases });
  const clasesController = makeClasesController({ clasesUseCases });
  const inscripcionesController = makeInscripcionesController({ inscripcionesUseCases });
  const authController = makeAuthController({ authUseCases });

  const router = Router();
  router.use("/auth", makeAuthRouter({ authController }));
  router.use("/socios", makeSociosRouter({ sociosController, requireAuth }));
  router.use("/clases", makeClasesRouter({ clasesController, requireAuth }));
  router.use("/inscripciones", makeInscripcionesRouter({ inscripcionesController, requireAuth }));
  return router;
}