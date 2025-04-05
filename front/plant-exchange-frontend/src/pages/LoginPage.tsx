// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.scss';

interface LoginPageProps {
  onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  return (
    <div className="login-page">
      <div className="container">
        <h1>Вход</h1>
        <LoginForm onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;