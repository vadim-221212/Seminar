import React from 'react';
import './ExchangeModal.scss';

interface ExchangeModalProps {
  plants: { id: string; name: string; ownerEmail?: string }[]; // Добавляем почту владельца
  onSelect: (plantId: string) => void;
  onClose: () => void;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ plants, onSelect, onClose }) => {
  return (
    <div className="exchange-modal-overlay">
      <div className="exchange-modal">
        <h3>Выберите растение для обмена</h3>
        <ul>
          {plants.map(plant => (
            <li key={plant.id} onClick={() => onSelect(plant.id)}>
              <div>{plant.name}</div>
              <div>Владелец: {plant.ownerEmail}</div> {/* Отображаем почту владельца */}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ExchangeModal;