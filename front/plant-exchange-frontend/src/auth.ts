import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// Типы для данных пользователя и состояния авторизации
interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Состояние авторизации
let authState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Функция для сохранения токена и обновления состояния
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // Декодируем токен и обновляем состояние
  const decodedToken: any = jwtDecode(token);
  authState = {
    isAuthenticated: true,
    user: {
      id: decodedToken.userId,
      username: decodedToken.username,
      email: decodedToken.email,
    },
  };
};

// Функция для удаления токена и сброса состояния
export const removeAuthToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  authState = {
    isAuthenticated: false,
    user: null,
  };
};

// Функция для проверки токена при загрузке приложения
export const checkAuth = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Токен истек
      removeAuthToken();
    } else {
      setAuthToken(token);
    }
  }
};

// Функция для получения текущего состояния авторизации
export const getAuthState = (): AuthState => {
  return authState;
};

// Функция для выполнения входа
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post('http://localhost:4006/api/auth/login', credentials);
    const token = response.data.token;

    if (token) {
      setAuthToken(token);

      // Если сервер не возвращает user, можно запросить его отдельно
      const userResponse = await axios.get('http://localhost:4006/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.data.user) {
        localStorage.setItem('user_id', userResponse.data.user.id);
        return true; // Успешный вход
      } else {
        console.error('Ошибка: пользователь не найден');
        return false;
      }
    } else {
      console.error('Ошибка: некорректный ответ от сервера', response.data);
      return false;
    }
  } catch (error) {
    console.error('Ошибка авторизации', error);
    return false;
  }
};

// Функция для выполнения выхода
export const logout = () => {
  removeAuthToken();
  window.location.href = '/login'; // Перенаправляем на страницу входа
};

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });




  export const register = async (credentials: { username: string; email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:4006/api/auth/register', credentials);
      console.log('Ответ сервера:', response.data); // Логируем ответ сервера
  
      if (response.data.message === 'User registered successfully') {
        // Сохраняем данные пользователя (если нужно)
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('user_email', response.data.user.email);
        return true; // Успешная регистрация
      } else {
        console.error('Ошибка: некорректный ответ от сервера');
        return false;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.error('Ошибка: пользователь уже существует');
      } else {
        console.error('Ошибка при регистрации:', error);
      }
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  };
  export default axios;