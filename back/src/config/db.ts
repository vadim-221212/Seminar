import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Замените на ваше имя пользователя PostgreSQL
  host: 'localhost',
  database: 'template1',
  password: '3116358', // Замените на ваш пароль
  port: 5432,
});

export default pool;