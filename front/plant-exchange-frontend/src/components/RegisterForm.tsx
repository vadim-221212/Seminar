// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { register } from '../auth'; // Импортируем функцию register из auth.ts
import './RegisterForm.scss';

interface RegisterFormProps {
  onSuccess: () => void; // Колбэк, который вызывается после успешной регистрации
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Состояние для отображения ошибки

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    setError(''); // Сбрасываем ошибку перед отправкой запроса

    try {
      const success = await register({ username, email, password });

      if (success) {
        onSuccess(); // Вызываем колбэк onSuccess после успешной регистрации
      } else {
        setError('Ошибка при регистрации'); // Общая ошибка
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError('Пользователь с таким email или именем уже существует');
      } else {
        setError('Произошла ошибка при регистрации'); // Другие ошибки
      }
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Регистрация</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;