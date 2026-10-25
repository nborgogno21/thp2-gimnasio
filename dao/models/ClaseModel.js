import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../connection/sequelize.js";

export class ClaseModel extends Model {}

ClaseModel.init(
  {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    instructor: { type: DataTypes.STRING(100), allowNull: false },
    dia: { type: DataTypes.STRING(20), allowNull: false },
    horario: { type: DataTypes.STRING(5), allowNull: false },
    cupo: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Clase", tableName: "clases", timestamps: false }
);