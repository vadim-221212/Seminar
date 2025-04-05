import React from 'react';
import './PlantModal.scss';

interface PlantModalProps {
  plant: {
    id: string;
    name: string;
    description: string;
    owner_id: string;
    owner_email: string;
    image_url: string;
  };
  onClose: () => void;
  onExchange: (plantId: string) => void;
}

const PlantModal: React.FC<PlantModalProps> = ({ plant, onClose, onExchange }) => {
  const handleExchangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExchange(plant.id);
    onClose(); // Добавляем закрытие модального окна
  };

  return (
    <div className="plant-modal-overlay" onClick={onClose}>
      <div className="plant-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <img className="modal-image" src={plant.image_url} alt={plant.name} />
        <h2>{plant.name}</h2>
        <p>{plant.description}</p>
        <p>Владелец: {plant.owner_email}</p>
        <button 
          className="exchange-button" 
          onClick={handleExchangeClick} // Используем новый обработчик
        >
          Предложить обмен
        </button>
      </div>
    </div>
  );
};

export default PlantModal;