import { betterAuth } from "better-auth";
import { pool } from "./db.js";

const trustedOrigins = (process.env.TRUSTED_ORIGINS || process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins,
});