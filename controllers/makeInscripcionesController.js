export function makeInscripcionesController({ inscripcionesUseCases }) {
  return {
    async listar(req, res) {
      res.status(200).json(await inscripcionesUseCases.listar());
    },

    async obtener(req, res) {
      res.status(200).json(await inscripcionesUseCases.obtener(req.params.id));
    },

    async crear(req, res) {
      res.status(201).json(await inscripcionesUseCases.crear(req.body));
    },

    async eliminar(req, res) {
      await inscripcionesUseCases.eliminar(req.params.id);
      res.status(204).send();
    },
  };
}