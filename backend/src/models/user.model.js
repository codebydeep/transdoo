import { pool } from "../db.js";

export const UserModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id          VARCHAR(36)  PRIMARY KEY DEFAULT (UUID()),
        name        VARCHAR(100) NOT NULL,
        email       VARCHAR(150) NOT NULL UNIQUE,
        password    VARCHAR(255) NOT NULL,
        role        ENUM('admin', 'manager', 'driver') NOT NULL DEFAULT 'driver',
        created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  async findByEmail(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  async create({ name, email, password, role = "driver" }) {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    return rows;
  },
};
