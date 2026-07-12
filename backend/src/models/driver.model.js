import { pool } from "../db.js";

export const DriverModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS drivers (
        id               VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
        user_id          VARCHAR(36)   NOT NULL UNIQUE,
        license_no       VARCHAR(50)   NOT NULL UNIQUE,
        license_expiry   DATE          NOT NULL,
        phone            VARCHAR(20)   NOT NULL,
        status           ENUM('available', 'on_trip', 'off_duty', 'suspended') NOT NULL DEFAULT 'available',
        safety_score     DECIMAL(4,2)  NOT NULL DEFAULT 100.00 COMMENT 'Score out of 100',
        created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT d.*, u.name, u.email
       FROM drivers d
       JOIN users u ON u.id = d.user_id
       WHERE d.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async findByUserId(user_id) {
    const [rows] = await pool.execute(
      "SELECT * FROM drivers WHERE user_id = ?",
      [user_id]
    );
    return rows[0] || null;
  },

  async findAll({ status } = {}) {
    const base = `
      SELECT d.*, u.name, u.email
      FROM drivers d
      JOIN users u ON u.id = d.user_id
    `;
    if (status) {
      const [rows] = await pool.execute(base + " WHERE d.status = ? ORDER BY d.created_at DESC", [status]);
      return rows;
    }
    const [rows] = await pool.execute(base + " ORDER BY d.created_at DESC");
    return rows;
  },

  async create({ user_id, license_no, license_expiry, phone }) {
    const [result] = await pool.execute(
      "INSERT INTO drivers (user_id, license_no, license_expiry, phone) VALUES (?, ?, ?, ?)",
      [user_id, license_no, license_expiry, phone]
    );
    return result.insertId;
  },

  async updateStatus(id, status) {
    await pool.execute(
      "UPDATE drivers SET status = ? WHERE id = ?",
      [status, id]
    );
  },

  async updateSafetyScore(id, score) {
    await pool.execute(
      "UPDATE drivers SET safety_score = ? WHERE id = ?",
      [score, id]
    );
  },

  async update(id, fields) {
    const allowed = ["license_no", "license_expiry", "phone", "status", "safety_score"];
    const keys = Object.keys(fields).filter((k) => allowed.includes(k));
    if (keys.length === 0) return;
    const setClause = keys.map((k) => `${k} = ?`).join(", ");
    const values = keys.map((k) => fields[k]);
    await pool.execute(
      `UPDATE drivers SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  },
};
