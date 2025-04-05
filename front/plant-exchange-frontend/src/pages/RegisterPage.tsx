import React from 'react';
import RegisterForm from '../components/RegisterForm';
import './RegisterPage.scss';

const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <div className="container">
        <h1>Регистрация</h1>
        <RegisterForm onSuccess={() => window.location.href = '/login'} />
      </div>
    </div>
  );
};

export default RegisterPage;