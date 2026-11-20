import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";

export class InscripcionModel extends Model {}

InscripcionModel.init(
  {
    socioId: { type: DataTypes.INTEGER, allowNull: false },
    claseId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Inscripcion", tableName: "inscripciones", timestamps: false }
);