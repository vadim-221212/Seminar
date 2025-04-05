import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PlantPage.scss';
import '../styles/global.scss';

interface Plant {
  id: string;
  name: string;
  description: string;
  owner: string; // Почта владельца
  image: string;
}

const PlantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:4006/api/plants/${id}`)
      .then(response => setPlant(response.data))
      .catch(error => console.error('Ошибка при загрузке растения:', error));
  }, [id]);

  if (!plant) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="plant-page">
      <div className="container">
        <div className="plant-details">
          <div className="plant-image" style={{ backgroundImage: `url(${plant.image})` }} />
          <div className="plant-info">
            <h1>{plant.name}</h1>
            <p>{plant.description}</p>
            <small>Владелец: {plant.owner}</small> {/* Отображаем почту владельца */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantPage;