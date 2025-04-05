import { History, getHistory as getHistoryFromDb, addToHistory as addToHistoryInDb } from '../models/history';

export const getHistory = async (): Promise<History[]> => {
  return await getHistoryFromDb();
};

export const addToHistory = async (entry: Omit<History, 'id' | 'exchangedAt'>): Promise<History> => {
  return await addToHistoryInDb(entry);
};