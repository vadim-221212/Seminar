// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">PlantExchange</Link>
        </div>
        <nav className="nav">
          {isLoggedIn ? (
            <>
              <Link to="/exchange">Обмен</Link>
              <Link to="/history">История</Link>
              <button onClick={onLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/register">Регистрация</Link>
              <Link to="/login">Вход</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;