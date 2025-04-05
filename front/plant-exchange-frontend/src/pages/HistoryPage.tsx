// src/pages/HistoryPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoryPage.scss';

interface ExchangeHistory {
  id: string;
  plantName: string;
  fromUser: string;
  toUser: string;
  status: string;
  date: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<ExchangeHistory[]>([]);

  useEffect(() => {
    // Загрузка истории обменов из API
    axios.get(`${import.meta.env.VITE_API_URL}/api/history`) // Убедитесь, что URL правильный
      .then(response => setHistory(response.data))
      .catch(error => console.error('Ошибка при загрузке истории обменов:', error));
  }, []);

  return (
    <div className="history-page">
      <h1>История обменов</h1>
      <div className="history-list">
        {history.length > 0 ? (
          history.map(entry => (
            <div key={entry.id} className="history-entry">
              <div className="entry-details">
                <h3>{entry.plantName}</h3>
                <p>От: {entry.fromUser}</p>
                <p>Кому: {entry.toUser}</p>
                <p>Статус: {entry.status}</p>
                <small>Дата: {new Date(entry.date).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        ) : (
          <p>История обменов пуста.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;