// config/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Берём из переменных окружения
  ssl: {
    rejectUnauthorized: false // Обязательно для Supabase
  }
});

// Проверка подключения при старте
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => console.error('❌ PostgreSQL connection error', err));

export default pool;