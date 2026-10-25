import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../connection/sequelize.js";

export class SocioModel extends Model {}

SocioModel.init(
  {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    dni: { type: DataTypes.STRING(8), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false },
    plan: { type: DataTypes.STRING(20), allowNull: false },
  },
  { sequelize, modelName: "Socio", tableName: "socios", timestamps: false }
);