let socios = [];
let siguienteId = 1;

export const sociosMemoryDao = {
  async init() {},

  async getAll() {
    return socios.map((s) => ({ ...s }));
  },

  async getById(id) {
    const socio = socios.find((s) => s.id === id);
    return socio ? { ...socio } : null;
  },

  async getByDni(dni) {
    const socio = socios.find((s) => s.dni === dni);
    return socio ? { ...socio } : null;
  },

  async save(data) {
    const socio = { id: siguienteId++, ...data };
    socios.push(socio);
    return { ...socio };
  },

  async update(id, changes) {
    const index = socios.findIndex((s) => s.id === id);
    if (index === -1) return null;
    socios[index] = { ...socios[index], ...changes };
    return { ...socios[index] };
  },

  async delete(id) {
    const index = socios.findIndex((s) => s.id === id);
    if (index === -1) return false;
    socios.splice(index, 1);
    return true;
  },
};