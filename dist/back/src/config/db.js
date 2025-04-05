"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL, // Render автоматически добавит этот ключ
    ssl: { rejectUnauthorized: false } // Обязательно для внешних подключений
  });
exports.default = pool;
