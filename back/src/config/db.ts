import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres.mvhwdcbxqgflenmxrkza',
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 6543,
  ssl: {
    rejectUnauthorized: false
  },
  // Решаем проблему SASL:
  connectionTimeoutMillis: 5000,
  application_name: 'seminar-app',
  // Явно указываем метод аутентификации:
  types: {
    getTypeParser: () => text => text
  }
});

export default pool;