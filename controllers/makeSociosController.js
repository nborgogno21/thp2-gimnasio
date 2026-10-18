export function makeSociosController({ sociosUseCases }) {
  return {
    async listar(req, res) {
      res.status(200).json(await sociosUseCases.listar());
    },

    async obtener(req, res) {
      res.status(200).json(await sociosUseCases.obtener(req.params.id));
    },

    async crear(req, res) {
      res.status(201).json(await sociosUseCases.crear(req.body));
    },

    async actualizar(req, res) {
      res.status(200).json(await sociosUseCases.actualizar(req.params.id, req.body));
    },

    async eliminar(req, res) {
      await sociosUseCases.eliminar(req.params.id);
      res.status(204).send();
    },
  };
}