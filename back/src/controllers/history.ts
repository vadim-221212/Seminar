import { Request, Response } from 'express';
import * as historyService from '../services/historyService';

export const getHistory = (req: Request, res: Response) => {
  res.json(historyService.getHistory());
};