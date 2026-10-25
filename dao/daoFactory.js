import { config } from "../config/config.js";
import { sociosMemoryDao } from "./memory/sociosMemoryDao.js";
import { clasesMemoryDao } from "./memory/clasesMemoryDao.js";
import { inscripcionesMemoryDao } from "./memory/inscripcionesMemoryDao.js";

function persistenciaInvalida() {
  return new Error(
    `PERSISTENCE_TYPE inválido: "${config.persistenceType}". Usá "memory" o "sequelize"`
  );
}

export async function getSociosDao() {
  switch (config.persistenceType) {
    case "memory":
      return sociosMemoryDao;
    case "sequelize":
      return (await import("./sequelize/sociosSequelizeDao.js")).sociosSequelizeDao;
    default:
      throw persistenciaInvalida();
  }
}

export async function getClasesDao() {
  switch (config.persistenceType) {
    case "memory":
      return clasesMemoryDao;
    case "sequelize":
      return (await import("./sequelize/clasesSequelizeDao.js")).clasesSequelizeDao;
    default:
      throw persistenciaInvalida();
  }
}

export async function getInscripcionesDao() {
  switch (config.persistenceType) {
    case "memory":
      return inscripcionesMemoryDao;
    case "sequelize":
      return (await import("./sequelize/inscripcionesSequelizeDao.js"))
        .inscripcionesSequelizeDao;
    default:
      throw persistenciaInvalida();
  }
}