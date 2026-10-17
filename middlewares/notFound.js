import { AppError } from "../errors/AppError.js";

export const notFound = (req, res, next) => {
  next(new AppError(404, "NOT_FOUND", `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
};