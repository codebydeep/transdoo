import { pool } from "../db.js";

export const FuelModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS fuel_logs (
        id            VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
        vehicle_id    VARCHAR(36)   NOT NULL,
        trip_id       VARCHAR(36)   NULL COMMENT 'Optional: linked trip',
        logged_by     VARCHAR(36)   NOT NULL,
        liters        DECIMAL(8,2)  NOT NULL,
        cost_per_liter DECIMAL(8,2) NOT NULL,
        total_cost    DECIMAL(10,2) GENERATED ALWAYS AS (liters * cost_per_liter) STORED,
        odometer_km   DECIMAL(10,2) NOT NULL COMMENT 'Reading at time of refuel',
        fueled_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
        FOREIGN KEY (trip_id)    REFERENCES trips(id),
        FOREIGN KEY (logged_by)  REFERENCES users(id)
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT f.*, v.registration_no, u.name AS logged_by_name
       FROM fuel_logs f
       JOIN vehicles v ON v.id = f.vehicle_id
       JOIN users    u ON u.id = f.logged_by
       WHERE f.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async findAll({ vehicle_id, trip_id } = {}) {
    const conditions = [];
    const params = [];

    if (vehicle_id) { conditions.push("f.vehicle_id = ?"); params.push(vehicle_id); }
    if (trip_id)    { conditions.push("f.trip_id = ?");    params.push(trip_id); }

    const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

    const [rows] = await pool.execute(
      `SELECT f.*, v.registration_no, u.name AS logged_by_name
       FROM fuel_logs f
       JOIN vehicles v ON v.id = f.vehicle_id
       JOIN users    u ON u.id = f.logged_by
       ${where}
       ORDER BY f.fueled_at DESC`,
      params
    );
    return rows;
  },

  async create({ vehicle_id, trip_id = null, logged_by, liters, cost_per_liter, odometer_km, fueled_at }) {
    const [result] = await pool.execute(
      `INSERT INTO fuel_logs (vehicle_id, trip_id, logged_by, liters, cost_per_liter, odometer_km, fueled_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [vehicle_id, trip_id, logged_by, liters, cost_per_liter, odometer_km, fueled_at || new Date()]
    );
    return result.insertId;
  },

  async totalCostByVehicle(vehicle_id) {
    const [rows] = await pool.execute(
      "SELECT SUM(total_cost) AS total FROM fuel_logs WHERE vehicle_id = ?",
      [vehicle_id]
    );
    return rows[0]?.total || 0;
  },
};
