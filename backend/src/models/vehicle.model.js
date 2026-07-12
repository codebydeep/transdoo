import { pool } from "../db.js";

export const VehicleModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id               VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
        registration_no  VARCHAR(50)   NOT NULL UNIQUE,
        make             VARCHAR(100)  NOT NULL,
        model            VARCHAR(100)  NOT NULL,
        year             YEAR          NOT NULL,
        capacity         INT           NOT NULL COMMENT 'Passenger or cargo capacity',
        fuel_type        ENUM('petrol', 'diesel', 'electric', 'cng') NOT NULL DEFAULT 'diesel',
        status           ENUM('available', 'on_trip', 'in_shop', 'retired') NOT NULL DEFAULT 'available',
        created_by       VARCHAR(36)   NOT NULL,
        created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      "SELECT * FROM vehicles WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  async findAll({ status } = {}) {
    if (status) {
      const [rows] = await pool.execute(
        "SELECT * FROM vehicles WHERE status = ? ORDER BY created_at DESC",
        [status]
      );
      return rows;
    }
    const [rows] = await pool.execute(
      "SELECT * FROM vehicles ORDER BY created_at DESC"
    );
    return rows;
  },

  async create({ registration_no, make, model, year, capacity, fuel_type, created_by }) {
    const [result] = await pool.execute(
      `INSERT INTO vehicles (registration_no, make, model, year, capacity, fuel_type, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [registration_no, make, model, year, capacity, fuel_type, created_by]
    );
    return result.insertId;
  },

  async updateStatus(id, status) {
    await pool.execute(
      "UPDATE vehicles SET status = ? WHERE id = ?",
      [status, id]
    );
  },

  async update(id, fields) {
    const allowed = ["registration_no", "make", "model", "year", "capacity", "fuel_type", "status"];
    const keys = Object.keys(fields).filter((k) => allowed.includes(k));
    if (keys.length === 0) return;
    const setClause = keys.map((k) => `${k} = ?`).join(", ");
    const values = keys.map((k) => fields[k]);
    await pool.execute(
      `UPDATE vehicles SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  },
};
