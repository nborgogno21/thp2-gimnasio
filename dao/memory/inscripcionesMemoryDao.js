let inscripciones = [];
let siguienteId = 1;

export const inscripcionesMemoryDao = {
  async init() {},

  async getAll() {
    return inscripciones.map((i) => ({ ...i }));
  },

  async getById(id) {
    const inscripcion = inscripciones.find((i) => i.id === id);
    return inscripcion ? { ...inscripcion } : null;
  },

  async getBySocioAndClase(socioId, claseId) {
    const inscripcion = inscripciones.find(
      (i) => i.socioId === socioId && i.claseId === claseId
    );
    return inscripcion ? { ...inscripcion } : null;
  },

  async countByClase(claseId) {
    return inscripciones.filter((i) => i.claseId === claseId).length;
  },

  async save(data) {
    const inscripcion = { id: siguienteId++, ...data };
    inscripciones.push(inscripcion);
    return { ...inscripcion };
  },

  async delete(id) {
    const index = inscripciones.findIndex((i) => i.id === id);
    if (index === -1) return false;
    inscripciones.splice(index, 1);
    return true;
  },
};