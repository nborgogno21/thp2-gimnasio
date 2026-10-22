import { AppError } from "../errors/AppError.js";

export function makeInscripcionesUseCases({ inscripcionesDao, sociosDao, clasesDao }) {
  const obtener = async (id) => {
    const inscripcion = await inscripcionesDao.getById(id);
    if (!inscripcion) {
      throw new AppError(404, "INSCRIPCION_NO_ENCONTRADA", "Inscripción no encontrada");
    }
    return inscripcion;
  };

  return {
    listar: () => inscripcionesDao.getAll(),

    obtener,

    async crear({ socioId, claseId }) {
      const socio = await sociosDao.getById(socioId);
      if (!socio) {
        throw new AppError(404, "SOCIO_NO_ENCONTRADO", "Socio no encontrado");
      }

      const clase = await clasesDao.getById(claseId);
      if (!clase) {
        throw new AppError(404, "CLASE_NO_ENCONTRADA", "Clase no encontrada");
      }

      const yaInscripto = await inscripcionesDao.getBySocioAndClase(socioId, claseId);
      if (yaInscripto) {
        throw new AppError(409, "YA_INSCRIPTO", "El socio ya está inscripto en esta clase");
      }

      const inscriptos = await inscripcionesDao.countByClase(claseId);
      if (inscriptos >= clase.cupo) {
        throw new AppError(409, "CUPO_COMPLETO", "La clase no tiene cupo disponible");
      }

      return inscripcionesDao.save({ socioId, claseId });
    },

    async eliminar(id) {
      await obtener(id);
      await inscripcionesDao.delete(id);
    },
  };
}