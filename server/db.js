import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();


const pool = new Pool({
  user: process.env.POSTGIS_USER,
  host: "artur-db",
  database: process.env.POSTGIS_DB,
  password: process.env.POSTGIS_PASSWORD,
  port: 5432,
});

export default pool;
