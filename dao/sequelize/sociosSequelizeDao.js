import { sequelize } from "../../connection/sequelize.js";
import { SocioModel } from "../models/index.js";

export const sociosSequelizeDao = {
  async init() {
    await sequelize.sync();
  },

  async getAll() {
    const rows = await SocioModel.findAll({ order: [["id", "ASC"]] });
    return rows.map((row) => row.toJSON());
  },

  async getById(id) {
    const row = await SocioModel.findByPk(id);
    return row ? row.toJSON() : null;
  },

  async getByDni(dni) {
    const row = await SocioModel.findOne({ where: { dni } });
    return row ? row.toJSON() : null;
  },

  async save(data) {
    const row = await SocioModel.create(data);
    return row.toJSON();
  },

  async update(id, changes) {
    const row = await SocioModel.findByPk(id);
    if (!row) return null;
    await row.update(changes);
    return row.toJSON();
  },

  async delete(id) {
    const eliminados = await SocioModel.destroy({ where: { id } });
    return eliminados > 0;
  },
};