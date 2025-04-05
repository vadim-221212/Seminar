// src/components/HistoryCard.tsx
import React from 'react';
import './HistoryCard.scss';

interface HistoryCardProps {
  id: string;
  plantName: string;
  fromUser: string;
  toUser: string;
  exchangedAt: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({  plantName, fromUser, toUser, exchangedAt }) => {
  return (
    <div className="history-card">
      <h3>{plantName}</h3>
      <p>От: {fromUser}</p>
      <p>Кому: {toUser}</p>
      <p>Дата обмена: {exchangedAt}</p>
    </div>
  );
};

export default HistoryCard;