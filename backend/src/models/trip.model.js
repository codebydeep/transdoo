import { pool } from "../db.js";

export const TripModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS trips (
        id               VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
        vehicle_id       VARCHAR(36)   NOT NULL,
        driver_id        VARCHAR(36)   NOT NULL,
        created_by       VARCHAR(36)   NOT NULL,
        origin           VARCHAR(255)  NOT NULL,
        destination      VARCHAR(255)  NOT NULL,
        scheduled_at     TIMESTAMP     NOT NULL,
        started_at       TIMESTAMP     NULL,
        completed_at     TIMESTAMP     NULL,
        distance_km      DECIMAL(8,2)  NULL COMMENT 'Filled on completion',
        passengers       INT           NOT NULL DEFAULT 1,
        status           ENUM('draft', 'dispatched', 'completed', 'cancelled') NOT NULL DEFAULT 'draft',
        notes            TEXT          NULL,
        created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id)  REFERENCES vehicles(id),
        FOREIGN KEY (driver_id)   REFERENCES drivers(id),
        FOREIGN KEY (created_by)  REFERENCES users(id)
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT t.*,
              v.registration_no, v.make, v.model AS vehicle_model,
              u.name AS driver_name,
              cb.name AS created_by_name
       FROM trips t
       JOIN vehicles v ON v.id = t.vehicle_id
       JOIN drivers  d ON d.id = t.driver_id
       JOIN users    u ON u.id = d.user_id
       JOIN users   cb ON cb.id = t.created_by
       WHERE t.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async findAll({ status, driver_id, vehicle_id } = {}) {
    const conditions = [];
    const params = [];

    if (status)     { conditions.push("t.status = ?");     params.push(status); }
    if (driver_id)  { conditions.push("t.driver_id = ?");  params.push(driver_id); }
    if (vehicle_id) { conditions.push("t.vehicle_id = ?"); params.push(vehicle_id); }

    const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

    const [rows] = await pool.execute(
      `SELECT t.*, v.registration_no, u.name AS driver_name
       FROM trips t
       JOIN vehicles v ON v.id = t.vehicle_id
       JOIN drivers  d ON d.id = t.driver_id
       JOIN users    u ON u.id = d.user_id
       ${where}
       ORDER BY t.scheduled_at DESC`,
      params
    );
    return rows;
  },

  async create({ vehicle_id, driver_id, created_by, origin, destination, scheduled_at, passengers, notes }) {
    const [result] = await pool.execute(
      `INSERT INTO trips (vehicle_id, driver_id, created_by, origin, destination, scheduled_at, passengers, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [vehicle_id, driver_id, created_by, origin, destination, scheduled_at, passengers, notes]
    );
    return result.insertId;
  },

  async updateStatus(id, status, extraFields = {}) {
    const allowed = ["started_at", "completed_at", "distance_km"];
    const keys = Object.keys(extraFields).filter((k) => allowed.includes(k));
    const setClause = ["status = ?", ...keys.map((k) => `${k} = ?`)].join(", ");
    const values = [status, ...keys.map((k) => extraFields[k]), id];
    await pool.execute(`UPDATE trips SET ${setClause} WHERE id = ?`, values);
  },
};
