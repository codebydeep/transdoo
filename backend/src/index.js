import express from "express";
import cors from "cors";
import { auth } from "./auth.js";
import { pool } from "./db.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { getMigrations } from "better-auth/db/migration";
import { runMigrations } from "./models/index.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, origin || false);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json(session);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    const { runMigrations: runAuthMigrations } = await getMigrations(auth.options);
    await runAuthMigrations();
    await runMigrations();

    const connection = await pool.getConnection();
    console.log(`✅  MySQL connected — database: ${process.env.DB_NAME}`);
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀  Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌  Failed to connect to MySQL:", err.message || err);
    process.exit(1);
  }
}

startServer();
