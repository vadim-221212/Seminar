// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ExchangePage from './pages/ExchangePage';
import HistoryPage from './pages/HistoryPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { checkAuth, getAuthState, logout } from './auth';
import PlantChatBot from './components/PlantChatBot';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    checkAuth();
    const authState = getAuthState();
    setIsLoggedIn(authState.isAuthenticated);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    alert('Вы вышли из системы.');
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onSuccess={handleLoginSuccess} />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      
      <PlantChatBot 
        showChatBot={showChatBot}
        onClose={() => setShowChatBot(false)}
        onOpen={() => setShowChatBot(true)}
      />
      
      <Footer />
    </Router>
  );
};

export default App;