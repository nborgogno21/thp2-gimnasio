export function makeAuthController({ authUseCases }) {
  return {
    async login(req, res) {
      res.status(200).json(await authUseCases.login(req.body));
    },
  };
}