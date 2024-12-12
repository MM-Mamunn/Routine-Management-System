import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  port: 5432,
  database: "IIUC_Bus_Management",
});

export default pool;
