// src/models/exchange.ts
import pool from '../config/db';

export interface Exchange {
  id: string;
  plantId: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  fromUserEmail: string; // Добавляем email отправителя
  toUserEmail: string; // Добавляем email получателя
}
import { getUserById } from '../models/user'; // Импортируем функцию для получения пользователя по ID

export const createExchange = async (exchangeData: Omit<Exchange, 'id' | 'createdAt'>): Promise<Exchange> => {
  const fromUser = await getUserById(Number(exchangeData.fromUserId));
  const toUser = await getUserById(Number(exchangeData.toUserId));

  const query = `
    INSERT INTO exchanges (plant_id, from_user_id, to_user_id, status, from_user_email, to_user_email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    exchangeData.plantId,
    exchangeData.fromUserId,
    exchangeData.toUserId,
    exchangeData.status,
    fromUser?.email || 'Неизвестно', // Добавляем email отправителя
    toUser?.email || 'Неизвестно', // Добавляем email получателя
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};