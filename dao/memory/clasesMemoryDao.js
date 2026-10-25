let clases = [];
let siguienteId = 1;

export const clasesMemoryDao = {
  async init() {},

  async getAll() {
    return clases.map((c) => ({ ...c }));
  },

  async getById(id) {
    const clase = clases.find((c) => c.id === id);
    return clase ? { ...clase } : null;
  },

  async save(data) {
    const clase = { id: siguienteId++, ...data };
    clases.push(clase);
    return { ...clase };
  },

  async update(id, changes) {
    const index = clases.findIndex((c) => c.id === id);
    if (index === -1) return null;
    clases[index] = { ...clases[index], ...changes };
    return { ...clases[index] };
  },

  async delete(id) {
    const index = clases.findIndex((c) => c.id === id);
    if (index === -1) return false;
    clases.splice(index, 1);
    return true;
  },
};