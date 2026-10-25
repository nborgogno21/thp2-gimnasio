import { Sequelize } from "sequelize";
import { config } from "../config/config.js";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.dbStorage,
  logging: false,
});