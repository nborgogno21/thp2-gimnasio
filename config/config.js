require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  persistenceType: process.env.PERSISTENCE_TYPE || "memory",
};

module.exports = config;