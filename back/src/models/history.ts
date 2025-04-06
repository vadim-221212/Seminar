import {pool} from '../config/db';

export interface History {
  id: number;
  exchangeId: string;
  plantId: number;
  fromUserId: string;
  toUserId: string;
  exchangedAt: Date;
}

export const getHistory = async (): Promise<History[]> => {
  const query = 'SELECT * FROM history';
  const { rows } = await pool.query(query);
  return rows;
};

export const addToHistory = async (entry: Omit<History, 'id' | 'exchangedAt'>): Promise<History> => {
  const query = `
    INSERT INTO history (exchange_id, plant_id, from_user_id, to_user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [entry.exchangeId, entry.plantId, entry.fromUserId, entry.toUserId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};