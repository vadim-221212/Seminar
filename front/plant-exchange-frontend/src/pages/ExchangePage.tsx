import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExchangeCard from '../components/ExchangeCard';
import './ExchangePage.scss';

interface Exchange {
  id: string;
  plantId: string;
  fromUserEmail: string;
  toUserEmail: string;
  status: string;
}

const ExchangePage: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/api/exchanges`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setExchanges(response.data))
      .catch(error => console.error('Ошибка при загрузке предложений:', error));
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/exchanges/${id}/status`,
        { status: 'accepted' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExchanges(exchanges.map(ex => (ex.id === id ? response.data : ex)));
    } catch (error) {
      console.error('Ошибка при подтверждении обмена:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/exchanges/${id}/status`,
        { status: 'rejected' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExchanges(exchanges.map(ex => (ex.id === id ? response.data : ex)));
    } catch (error) {
      console.error('Ошибка при отклонении обмена:', error);
    }
  };

  const filteredExchanges = exchanges.filter(exchange => {
    if (filter === 'all') return true;
    return exchange.status === filter;
  });

  return (
    <div className="exchange-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Предложения обмена</h1>
          <p>Здесь вы можете управлять вашими запросами на обмен.</p>
        </div>
      </div>
      <div className="container">
        <div className="filters">
          <button onClick={() => setFilter('all')}>Все</button>
          <button onClick={() => setFilter('pending')}>Ожидающие</button>
          <button onClick={() => setFilter('accepted')}>Подтвержденные</button>
          <button onClick={() => setFilter('rejected')}>Отклоненные</button>
        </div>
        <div className="exchanges-list">
          {filteredExchanges.map(exchange => (
            <ExchangeCard
              key={exchange.id}
              id={exchange.id}
              plantId={exchange.plantId}
              fromUserEmail={exchange.fromUserEmail}
              toUserEmail={exchange.toUserEmail}
              status={exchange.status}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;