import { Request, Response } from 'express';
import * as exchangeService from '../services/exchangeService';
import { Exchange } from '../models/exchange';
import { getUserById } from '../models/user'; // Импортируем функцию для получения пользователя по ID
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '123321'; // Секретный ключ для проверки токена

export const getExchanges = async (req: Request, res: Response): Promise<void> => {
  try {
    const exchanges = exchangeService.getExchanges();

    // Для каждого обмена получаем email отправителя и получателя
    const exchangesWithEmails = await Promise.all(
      exchanges.map(async (exchange) => {
        const fromUser = await getUserById(Number(exchange.fromUserId));
        const toUser = await getUserById(Number(exchange.toUserId));

        return {
          ...exchange,
          fromUserEmail: fromUser?.email || 'Неизвестно', // Добавляем email отправителя
          toUserEmail: toUser?.email || 'Неизвестно', // Добавляем email получателя
        };
      })
    );

    res.json(exchangesWithEmails);
  } catch (error) {
    console.error('Ошибка при получении обменов:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getExchange = async (req: Request, res: Response): Promise<void> => {
  try {
    const exchange = exchangeService.getExchangeById(req.params.id);
    if (!exchange) {
      res.status(404).json({ message: 'Exchange not found' });
      return;
    }

    // Получаем email отправителя и получателя
    const fromUser = await getUserById(Number(exchange.fromUserId));
    const toUser = await getUserById(Number(exchange.toUserId));

    const exchangeWithEmails = {
      ...exchange,
      fromUserEmail: fromUser?.email || 'Неизвестно', // Добавляем email отправителя
      toUserEmail: toUser?.email || 'Неизвестно', // Добавляем email получателя
    };

    res.json(exchangeWithEmails);
  } catch (error) {
    console.error('Ошибка при получении обмена:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const createExchange = async (req: Request, res: Response): Promise<void> => {
  const { plantId, toUserId } = req.body;

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Необходима авторизация' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const fromUserId = decoded.id;

    if (fromUserId === toUserId) {
      res.status(400).json({ message: 'Нельзя предложить обмен самому себе' });
      return;
    }

    const newExchange: Exchange = {
      id: Date.now().toString(),
      plantId,
      fromUserId,
      toUserId,
      fromUserEmail: decoded.email, // Почта отправителя
      toUserEmail: '', // Почта получателя будет заполнена позже
      status: 'pending',
      createdAt: new Date(),
    };

    // Получаем почту получателя
    const toUser = await getUserById(Number(toUserId));
    newExchange.toUserEmail = toUser?.email || 'Неизвестно';

    exchangeService.createExchange(newExchange);
    res.status(201).json(newExchange);
  } catch (error) {
    console.error('Ошибка при создании обмена:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const updateExchangeStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedExchange = await exchangeService.updateExchangeStatus(id, status);
    if (updatedExchange) {
      res.json(updatedExchange);
    } else {
      res.status(404).json({ message: 'Обмен не найден' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении статуса обмена:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


export const deleteExchange = (req: Request, res: Response): void => {
  exchangeService.deleteExchange(req.params.id);
  res.status(204).send();
};

export const findCompatibleExchanges = async (req: Request, res: Response): Promise<void> => {
  const { userId, plantId } = req.query;

  if (!userId || !plantId) {
    res.status(400).json({ message: 'Необходимо указать userId и plantId' });
    return;
  }

  try {
    const compatibleExchanges = exchangeService.findCompatibleExchanges(userId as string, plantId as string);

    // Для каждого обмена получаем email отправителя и получателя
    const exchangesWithEmails = await Promise.all(
      compatibleExchanges.map(async (exchange) => {
        const fromUser = await getUserById(Number(exchange.fromUserId));
        const toUser = await getUserById(Number(exchange.toUserId));

        return {
          ...exchange,
          fromUserEmail: fromUser?.email || 'Неизвестно', // Добавляем email отправителя
          toUserEmail: toUser?.email || 'Неизвестно', // Добавляем email получателя
        };
      })
    );

    res.json(exchangesWithEmails);
  } catch (error) {
    console.error('Ошибка при поиске совместимых обменов:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};