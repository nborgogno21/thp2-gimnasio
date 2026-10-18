import express from "express";
import { config } from "./config/config.js";
import { buildContainer } from "./container/container.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/api", await buildContainer());

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
});