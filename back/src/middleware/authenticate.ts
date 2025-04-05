import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Берем токен из заголовков

  if (!token) {
    return res.status(401).json({ message: 'Требуется аутентификация' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.user = { id: decoded.id }; // Добавляем user в req
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Неверный токен' });
  }
};
