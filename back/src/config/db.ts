import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render подставит свой URL
  ssl: { rejectUnauthorized: false }  // Обязательно для Render/PostgreSQL
});

export default pool;