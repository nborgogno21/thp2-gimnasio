import { readFileSync } from "node:fs";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";

const openapi = parse(
  readFileSync(new URL("./openapi.yaml", import.meta.url), "utf8")
);

export const swaggerRouter = Router();
swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(openapi));