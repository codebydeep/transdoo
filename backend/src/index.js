import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dir, "..", ".env") });

import express      from "express";
import cors         from "cors";
import cookieParser from "cookie-parser";
import { pool }     from "./db.js";
import { runMigrations } from "./models/index.js";
import authRoutes   from "./routes/auth.routes.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use((err, _req, res, _next) => {
  console.error("[error]", err.message ?? err);
  res.status(500).json({ message: err.message ?? "Internal server error" });
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    const conn = await pool.getConnection();
    console.log(`✅  MySQL connected — database: ${process.env.DB_NAME}`);
    conn.release();

    await runMigrations();

    app.listen(PORT, () => {
      console.log(`🚀  Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌  Failed to start:", err.message ?? err);
    process.exit(1);
  }
}

startServer();
