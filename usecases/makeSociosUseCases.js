import { AppError } from "../errors/AppError.js";

export function makeSociosUseCases({ sociosDao }) {
  const obtener = async (id) => {
    const socio = await sociosDao.getById(id);
    if (!socio) {
      throw new AppError(404, "SOCIO_NO_ENCONTRADO", "Socio no encontrado");
    }
    return socio;
  };

  const verificarDniLibre = async (dni, idActual) => {
    const existente = await sociosDao.getByDni(dni);
    if (existente && existente.id !== idActual) {
      throw new AppError(409, "DNI_DUPLICADO", "Ya existe un socio con ese DNI");
    }
  };

  return {
    listar: () => sociosDao.getAll(),

    obtener,

    async crear(data) {
      await verificarDniLibre(data.dni);
      return sociosDao.save(data);
    },

    async actualizar(id, cambios) {
      await obtener(id);
      if (cambios.dni) await verificarDniLibre(cambios.dni, id);
      return sociosDao.update(id, cambios);
    },

    async eliminar(id) {
      await obtener(id);
      await sociosDao.delete(id);
    },
  };
}