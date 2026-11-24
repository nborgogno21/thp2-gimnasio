import { AppError } from "../errors/AppError.js";

export function makeAuthUseCases({ passwordHasher, tokenService, adminUser, adminPasswordHash }) {
  return {
    async login({ usuario, password }) {
      const usuarioOk = usuario === adminUser;
      const passwordOk = await passwordHasher.compare(password, adminPasswordHash);

      if (!usuarioOk || !passwordOk) {
        throw new AppError(401, "CREDENCIALES_INVALIDAS", "Usuario o contraseña incorrectos");
      }

      return { token: tokenService.generate({ usuario }) };
    },
  };
}