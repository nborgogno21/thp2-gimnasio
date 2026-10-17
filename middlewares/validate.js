import { AppError } from "../errors/AppError.js";

export const validate = (schemas) => (req, res, next) => {
  for (const key of ["body", "params", "query"]) {
    if (!schemas[key]) continue;

    const result = schemas[key].safeParse(req[key]);
    if (!result.success) {
      return next(
        new AppError(400, "VALIDATION_ERROR", "Datos inválidos", result.error.issues)
      );
    }
    if (key !== "query") req[key] = result.data;
  }
  next();
};