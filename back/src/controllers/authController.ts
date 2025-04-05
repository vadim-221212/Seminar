import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, getUserById } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Заменить на .env

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Проверка, существует ли пользователь
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const newUser = await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    // Возвращаем токен и информацию о пользователе
    res.status(200).json({ 
      message: 'User logged in successfully', 
      token, 
      user: { id: user.id, email: user.email, username: user.username } 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded: any = jwt.verify(token, JWT_SECRET); // Принимаем как any для доступа к id
    const user = await getUserById(Number(decoded.id)); // Преобразуем id в число
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error during profile fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
