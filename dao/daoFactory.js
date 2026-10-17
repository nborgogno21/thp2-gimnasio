import { config } from "../config/config.js";
import { sociosMemoryDao } from "./sociosMemoryDao.js";

export function getSociosDao() {
  switch (config.persistenceType) {
    case "memory":
      return sociosMemoryDao;
    default:
      throw new Error(
        `PERSISTENCE_TYPE inválido: "${config.persistenceType}". Usá "memory"`
      );
  }
}