"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres', // Замените на ваше имя пользователя PostgreSQL
    host: 'localhost',
    database: 'template1',
    password: '3116358', // Замените на ваш пароль
    port: 5432,
});
exports.default = pool;
