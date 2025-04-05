// src/app.ts
import express from 'express';
import cors from 'cors';
import plantsRouter from './routes/plants';
import exchangesRouter from './routes/exchange';
import historyRouter from './routes/history';
import reportsRouter from './routes/report';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для CORS
app.use(cors());

// Подключение роутеров
console.log("Plants router loaded");
app.use('/api/plants', plantsRouter);
app.use('/api/exchanges', exchangesRouter);
app.use('/api/history', historyRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


export default app;