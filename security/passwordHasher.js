import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const passwordHasher = {
  async hash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  async compare(password, hash) {
    if (!hash) return false;
    return bcrypt.compare(password, hash);
  },
};