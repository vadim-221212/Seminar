import { User, createUser as createUserInDb, findUserByEmail as findUserByEmailInDb, getUsers as getUsersFromDb, getUserById as getUserByIdFromDb, updateUser as updateUserInDb, deleteUser as deleteUserFromDb } from '../models/user';

export const getUsers = async (): Promise<User[]> => {
  return await getUsersFromDb();
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return await getUserByIdFromDb(Number(id)); // Преобразуем id в number
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  // Проверяем, существует ли пользователь с таким email
  const existingUser = await findUserByEmailInDb(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Если пользователь не существует, создаем нового
  return await createUserInDb(userData);
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | undefined> => {
  return await updateUserInDb((id), userData); // Преобразуем id в number
};

export const deleteUser = async (id: string): Promise<void> => {
  await deleteUserFromDb((id)); // Преобразуем id в number
};
