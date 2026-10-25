import { sequelize } from "../../connection/sequelize.js";
import { InscripcionModel } from "../models/index.js";

export const inscripcionesSequelizeDao = {
  async init() {
    await sequelize.sync();
  },

  async getAll() {
    const rows = await InscripcionModel.findAll({ order: [["id", "ASC"]] });
    return rows.map((row) => row.toJSON());
  },

  async getById(id) {
    const row = await InscripcionModel.findByPk(id);
    return row ? row.toJSON() : null;
  },

  async getBySocioAndClase(socioId, claseId) {
    const row = await InscripcionModel.findOne({ where: { socioId, claseId } });
    return row ? row.toJSON() : null;
  },

  async countByClase(claseId) {
    return InscripcionModel.count({ where: { claseId } });
  },

  async save(data) {
    const row = await InscripcionModel.create(data);
    return row.toJSON();
  },

  async delete(id) {
    const eliminados = await InscripcionModel.destroy({ where: { id } });
    return eliminados > 0;
  },
};