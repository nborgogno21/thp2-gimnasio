const express = require("express");
const config = require("./config/config");

const app = express();
app.use(express.json());

app.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
});