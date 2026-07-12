import { pool } from "../db.js";

export const ExpenseModel = {
  async createTable() {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS expenses (
        id            VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
        vehicle_id    VARCHAR(36)   NULL,
        trip_id       VARCHAR(36)   NULL,
        logged_by     VARCHAR(36)   NOT NULL,
        category      ENUM('fuel', 'maintenance', 'toll', 'insurance', 'salary', 'other') NOT NULL,
        amount        DECIMAL(10,2) NOT NULL,
        description   TEXT          NULL,
        expense_date  DATE          NOT NULL,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
        FOREIGN KEY (trip_id)    REFERENCES trips(id),
        FOREIGN KEY (logged_by)  REFERENCES users(id)
      )
    `);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT e.*, v.registration_no, u.name AS logged_by_name
       FROM expenses e
       LEFT JOIN vehicles v ON v.id = e.vehicle_id
       JOIN users         u ON u.id = e.logged_by
       WHERE e.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async findAll({ vehicle_id, trip_id, category } = {}) {
    const conditions = [];
    const params = [];

    if (vehicle_id) { conditions.push("e.vehicle_id = ?"); params.push(vehicle_id); }
    if (trip_id)    { conditions.push("e.trip_id = ?");    params.push(trip_id); }
    if (category)   { conditions.push("e.category = ?");   params.push(category); }

    const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

    const [rows] = await pool.execute(
      `SELECT e.*, v.registration_no, u.name AS logged_by_name
       FROM expenses e
       LEFT JOIN vehicles v ON v.id = e.vehicle_id
       JOIN users         u ON u.id = e.logged_by
       ${where}
       ORDER BY e.expense_date DESC`,
      params
    );
    return rows;
  },

  async create({ vehicle_id = null, trip_id = null, logged_by, category, amount, description, expense_date }) {
    const [result] = await pool.execute(
      `INSERT INTO expenses (vehicle_id, trip_id, logged_by, category, amount, description, expense_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [vehicle_id, trip_id, logged_by, category, amount, description, expense_date]
    );
    return result.insertId;
  },

  async totalByCategory(vehicle_id) {
    const [rows] = await pool.execute(
      `SELECT category, SUM(amount) AS total
       FROM expenses
       WHERE vehicle_id = ?
       GROUP BY category`,
      [vehicle_id]
    );
    return rows;
  },

  async grandTotal({ vehicle_id, from, to } = {}) {
    const conditions = [];
    const params = [];

    if (vehicle_id) { conditions.push("vehicle_id = ?");      params.push(vehicle_id); }
    if (from)       { conditions.push("expense_date >= ?");    params.push(from); }
    if (to)         { conditions.push("expense_date <= ?");    params.push(to); }

    const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
    const [rows] = await pool.execute(
      `SELECT SUM(amount) AS total FROM expenses ${where}`,
      params
    );
    return rows[0]?.total || 0;
  },
};
