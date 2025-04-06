import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Обязательно для Neon.tech
  },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000
});

// Проверка подключения
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Neon PostgreSQL connected'))
  .catch(err => console.error('❌ Connection error:', err));

export default pool;