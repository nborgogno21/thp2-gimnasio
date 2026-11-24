import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const tokenService = {
  generate(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  },

  verify(token) {
    return jwt.verify(token, config.jwtSecret);
  },
};