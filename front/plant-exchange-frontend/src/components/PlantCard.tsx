import React from 'react';
import './PlantCard.scss';

interface PlantCardProps {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  onClick: (e: React.MouseEvent) => void; // Изменено на передачу события
  onExchange: (plantId: string, e: React.MouseEvent) => void; // Добавлен параметр события
}

const PlantCard: React.FC<PlantCardProps> = ({ id, name, description, owner, image, onClick, onExchange }) => {
  const handleExchangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExchange(id, e);
  };

  return (
    <div className="plant-card" onClick={onClick}>
      <img src={image} alt={name} />
      <div className="plant-info">
        <h3 className="plant-name">{name}</h3>
        <p>{description}</p>
        <p className="plant-owner">Владелец: {owner}</p>
        <button 
          className="exchange-button" 
          onClick={handleExchangeClick}
        >
          Обменять
        </button>
      </div>
    </div>
  );
};

export default PlantCard;