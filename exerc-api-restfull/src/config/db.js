import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "devuser2",
  password: "admin123",
  database: "cimatec_materials_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;