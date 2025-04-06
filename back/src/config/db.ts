import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Решаем проблему SASL:
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  // Явно указываем метод аутентификации:
  user: 'postgres.mvhwdcbxqgflenmxrkza', // Ваш пользователь из строки подключения
  password: process.env.DB_PASSWORD, // Вынесите пароль отдельно
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  // Важно:
  application_name: 'seminar-app'
});

// Проверка подключения
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ PostgreSQL error:', err));

export default pool;