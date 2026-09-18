import cors from "cors";
import express from "express";
import { pool } from "./db.js";
import { runMigrations } from "./models/index.js";

const app = express();
const port = Number(process.env.PORT) || 8000;
const allowedOrigin = process.env.CORS_ORIGIN || true;

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.status(200).json({ status: "ok" });
  } catch (error) {
    response.status(503).json({ status: "unavailable", error: error.message });
  }
});

app.get("/", (_request, response) => {
  response.json({ service: "transdoo-backend" });
});

async function start() {
  await runMigrations();
  app.listen(port, "0.0.0.0", () => {
    console.log(`TransDoo backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start the backend", error);
  process.exit(1);
});
