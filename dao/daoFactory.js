import { config } from "../config/config.js";
import { sociosMemoryDao } from "./sociosMemoryDao.js";
import { clasesMemoryDao } from "./clasesMemoryDao.js";

function persistenciaInvalida() {
  return new Error(
    `PERSISTENCE_TYPE inválido: "${config.persistenceType}". Usá "memory"`
  );
}

export function getSociosDao() {
  switch (config.persistenceType) {
    case "memory":
      return sociosMemoryDao;
    default:
      throw persistenciaInvalida();
  }
}

export function getClasesDao() {
  switch (config.persistenceType) {
    case "memory":
      return clasesMemoryDao;
    default:
      throw persistenciaInvalida();
  }
}