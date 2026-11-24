import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  persistenceType: process.env.PERSISTENCE_TYPE || "memory",
  dbStorage: process.env.DB_STORAGE || "./database.sqlite",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  adminUser: process.env.ADMIN_USER || "admin",
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH,
};