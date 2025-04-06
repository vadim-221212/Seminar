import {pool} from '../config/db';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [userData.username, userData.email, userData.password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const getUsers = async (): Promise<User[]> => {
  const query = 'SELECT * FROM users';
  const { rows } = await pool.query(query);
  return rows;
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | undefined> => {
  const query = `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [userData.username, userData.email, userData.password, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteUser = async (id: string): Promise<void> => {
  const query = 'DELETE FROM users WHERE id = $1';
  await pool.query(query, [id]);
};
