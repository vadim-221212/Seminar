// src/app.ts
import express from 'express';
import plantsRouter from './routes/plants';
import exchangesRouter from './routes/exchange';
import historyRouter from './routes/history';
import reportsRouter from './routes/report';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import dotenv from 'dotenv'

const app = express();
dotenv.config();
// Middleware для парсинга JSON
app.use(express.json());


// Подключение роутеров
console.log("Plants router loaded");
app.use('/api/plants', plantsRouter);
app.use('/api/exchanges', exchangesRouter);
app.use('/api/history', historyRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


export default app;