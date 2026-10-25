import { SocioModel } from "./SocioModel.js";
import { ClaseModel } from "./ClaseModel.js";
import { InscripcionModel } from "./InscripcionModel.js";

SocioModel.hasMany(InscripcionModel, {
  foreignKey: "socioId",
  as: "inscripciones",
  onDelete: "CASCADE",
});
InscripcionModel.belongsTo(SocioModel, { foreignKey: "socioId", as: "socio" });

ClaseModel.hasMany(InscripcionModel, {
  foreignKey: "claseId",
  as: "inscripciones",
  onDelete: "CASCADE",
});
InscripcionModel.belongsTo(ClaseModel, { foreignKey: "claseId", as: "clase" });

export { SocioModel, ClaseModel, InscripcionModel };