export function makeClasesController({ clasesUseCases }) {
  return {
    async listar(req, res) {
      res.status(200).json(await clasesUseCases.listar());
    },

    async obtener(req, res) {
      res.status(200).json(await clasesUseCases.obtener(req.params.id));
    },

    async crear(req, res) {
      res.status(201).json(await clasesUseCases.crear(req.body));
    },

    async actualizar(req, res) {
      res.status(200).json(await clasesUseCases.actualizar(req.params.id, req.body));
    },

    async eliminar(req, res) {
      await clasesUseCases.eliminar(req.params.id);
      res.status(204).send();
    },
  };
}