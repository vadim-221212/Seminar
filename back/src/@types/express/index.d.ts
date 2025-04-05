// src/@types/express/index.d.ts
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: { id: string }; // Добавляем user с полем id
  }
}
