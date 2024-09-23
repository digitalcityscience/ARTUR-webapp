import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Comment out this line when deploying
dotenv.config({ path: "../.env" });

const pool = new Pool({
  user: process.env.POSTGIS_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGIS_DB,
  password: process.env.POSTGIS_PASSWORD,
  port: 5432,
});

export default pool;
