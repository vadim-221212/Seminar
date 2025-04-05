import React from 'react';
import './ExchangeCard.scss';

interface ExchangeCardProps {
  id: string;
  plantId: string;
  fromUserEmail: string;
  toUserEmail: string;
  status: string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ id, plantId, fromUserEmail, toUserEmail, status, onAccept, onReject }) => {
  return (
    <div className="exchange-card">
      <h3>Растение: {plantId}</h3>
      <p>От: {fromUserEmail}</p>
      <p>Кому: {toUserEmail}</p>
      <p>Статус: {status}</p>
      {status === 'pending' && (
        <div className="actions">
          <button onClick={() => onAccept(id)}>Подтвердить</button>
          <button onClick={() => onReject(id)}>Отклонить</button>
        </div>
      )}
    </div>
  );
};

export default ExchangeCard;