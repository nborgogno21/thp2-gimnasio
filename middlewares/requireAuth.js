import { AppError } from "../errors/AppError.js";

export const makeRequireAuth = ({ tokenService }) => (req, res, next) => {
  const [tipo, token] = (req.headers.authorization || "").split(" ");

  if (tipo !== "Bearer" || !token) {
    return next(new AppError(401, "TOKEN_REQUERIDO", "Falta el token de autenticación"));
  }

  try {
    req.usuario = tokenService.verify(token);
    next();
  } catch {
    next(new AppError(401, "TOKEN_INVALIDO", "Token inválido o vencido"));
  }
};