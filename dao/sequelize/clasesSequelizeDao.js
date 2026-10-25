import { sequelize } from "../../connection/sequelize.js";
import { ClaseModel } from "../models/index.js";

export const clasesSequelizeDao = {
  async init() {
    await sequelize.sync();
  },

  async getAll() {
    const rows = await ClaseModel.findAll({ order: [["id", "ASC"]] });
    return rows.map((row) => row.toJSON());
  },

  async getById(id) {
    const row = await ClaseModel.findByPk(id);
    return row ? row.toJSON() : null;
  },

  async save(data) {
    const row = await ClaseModel.create(data);
    return row.toJSON();
  },

  async update(id, changes) {
    const row = await ClaseModel.findByPk(id);
    if (!row) return null;
    await row.update(changes);
    return row.toJSON();
  },

  async delete(id) {
    const eliminados = await ClaseModel.destroy({ where: { id } });
    return eliminados > 0;
  },
};