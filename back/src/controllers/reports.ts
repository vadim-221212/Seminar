import { Request, Response } from 'express';
import * as reportService from '../services/reportService';
import * as plantService from '../services/plantService';
import * as historyService from '../services/historyService';
import * as userService from '../services/userService';

export const getMostPopularPlants = async (req: Request, res: Response) => {
  try {
    // Используем await для получения данных
    const plants = await plantService.getPlants();
    const history = await historyService.getHistory();

    // Передаем данные в reportService
    const mostPopularPlants = reportService.getMostPopularPlants(plants, history);

    res.json(mostPopularPlants);
  } catch (error) {
    console.error('Error fetching most popular plants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMostActiveUsers = async (req: Request, res: Response) => {
  try {
    // Получаем историю и пользователей
    const history = await historyService.getHistory();
    const users = await userService.getUsers();

    // Логика для определения самых активных пользователей
    const userActivity = new Map<string, number>(); // Делаем ключи строками

    history.forEach(entry => {
      const userId = String(entry.fromUserId); // Приводим к строковому типу
      if (userActivity.has(userId)) {
        userActivity.set(userId, userActivity.get(userId)! + 1);
      } else {
        userActivity.set(userId, 1);
      }
    });

    // Сортируем пользователей по активности
    const sortedUsers = users.sort((a, b) => {
      const aActivity = userActivity.get(String(a.id)) || 0; // Приводим к строке при получении
      const bActivity = userActivity.get(String(b.id)) || 0; // Приводим к строке при получении
      return bActivity - aActivity;
    });

    res.json(sortedUsers);
  } catch (error) {
    console.error('Error fetching most active users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
