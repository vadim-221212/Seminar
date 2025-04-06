import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000, // Увеличено до 10 секунд
  idleTimeoutMillis: 30000,
  max: 20, // Максимальное количество соединений
  allowExitOnIdle: true
});

// Проверка подключения с переподключением
let retries = 3;
const testConnection = async () => {
  while (retries > 0) {
    try {
      await pool.query('SELECT NOW()');
      console.log('✅ PostgreSQL connected');
      break;
    } catch (err) {
      retries--;
      console.error(`❌ Connection failed, ${retries} retries left...`);
      await new Promise(res => setTimeout(res, 5000));
      if (retries === 0) throw err;
    }
  }
};

export { pool, testConnection };