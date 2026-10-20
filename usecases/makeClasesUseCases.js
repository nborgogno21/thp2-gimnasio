import { AppError } from "../errors/AppError.js";

export function makeClasesUseCases({ clasesDao }) {
  const obtener = async (id) => {
    const clase = await clasesDao.getById(id);
    if (!clase) {
      throw new AppError(404, "CLASE_NO_ENCONTRADA", "Clase no encontrada");
    }
    return clase;
  };

  return {
    listar: () => clasesDao.getAll(),

    obtener,

    crear: (data) => clasesDao.save(data),

    async actualizar(id, cambios) {
      await obtener(id);
      return clasesDao.update(id, cambios);
    },

    async eliminar(id) {
      await obtener(id);
      await clasesDao.delete(id);
    },
  };
}