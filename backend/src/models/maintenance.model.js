import { pool } from "../db.js";

export const MaintenanceModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS maintenance_logs (
        id            VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
        vehicle_id    VARCHAR(36)   NOT NULL,
        reported_by   VARCHAR(36)   NOT NULL,
        type          ENUM('scheduled', 'breakdown', 'accident', 'inspection') NOT NULL,
        description   TEXT          NOT NULL,
        cost          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        status        ENUM('open', 'in_progress', 'closed') NOT NULL DEFAULT 'open',
        started_at    TIMESTAMP     NULL,
        closed_at     TIMESTAMP     NULL,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id)  REFERENCES vehicles(id),
        FOREIGN KEY (reported_by) REFERENCES users(id)
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT m.*, v.registration_no, u.name AS reported_by_name
       FROM maintenance_logs m
       JOIN vehicles v ON v.id = m.vehicle_id
       JOIN users    u ON u.id = m.reported_by
       WHERE m.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async findAll({ vehicle_id, status } = {}) {
    const conditions = [];
    const params = [];

    if (vehicle_id) { conditions.push("m.vehicle_id = ?"); params.push(vehicle_id); }
    if (status)     { conditions.push("m.status = ?");     params.push(status); }

    const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

    const [rows] = await pool.execute(
      `SELECT m.*, v.registration_no, u.name AS reported_by_name
       FROM maintenance_logs m
       JOIN vehicles v ON v.id = m.vehicle_id
       JOIN users    u ON u.id = m.reported_by
       ${where}
       ORDER BY m.created_at DESC`,
      params
    );
    return rows;
  },

  async create({ vehicle_id, reported_by, type, description, cost = 0 }) {
    const [result] = await pool.execute(
      "INSERT INTO maintenance_logs (vehicle_id, reported_by, type, description, cost) VALUES (?, ?, ?, ?, ?)",
      [vehicle_id, reported_by, type, description, cost]
    );
    return result.insertId;
  },

  async updateStatus(id, status, extraFields = {}) {
    const allowed = ["started_at", "closed_at", "cost"];
    const keys = Object.keys(extraFields).filter((k) => allowed.includes(k));
    const setClause = ["status = ?", ...keys.map((k) => `${k} = ?`)].join(", ");
    const values = [status, ...keys.map((k) => extraFields[k]), id];
    await pool.execute(`UPDATE maintenance_logs SET ${setClause} WHERE id = ?`, values);
  },
};
