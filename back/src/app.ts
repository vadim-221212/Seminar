// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import plantsRouter from './routes/plants';
import exchangesRouter from './routes/exchange';
import historyRouter from './routes/history';
import reportsRouter from './routes/report';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

const app = express();
dotenv.config();

// ===== Безопасность =====
app.use(helmet()); // Защита заголовков
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


// ===== Лимит запросов =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // лимит для каждого IP
});
app.use(limiter);

// ===== Парсинг данных =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Роутеры =====
app.use('/api/plants', plantsRouter);
app.use('/api/exchanges', exchangesRouter);
app.use('/api/history', historyRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// ===== Health Check =====
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// ===== Обработка 404 =====
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// ===== Обработка ошибок =====
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;