// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import PlantModal from '../components/PlantModal';
import AddPlantForm from '../components/AddPlantForm';
import ExchangeModal from '../components/ExchangeModal';
import axios from 'axios';
import './HomePage.scss';


interface Plant {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  owner_email: string; // Добавляем поле для почты владельца
  image_url: string;
}

const HomePage: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [exchangePlantId, setExchangePlantId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/plants`)
      .then(response => setPlants(response.data))
      .catch(error => console.error('Ошибка при загрузке растений:', error));
  }, []);

  const handleAddPlant = async (newPlant: Omit<Plant, 'id'>) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/plants`, newPlant, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlants([...plants, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Ошибка при добавлении растения:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPlant(null);
  };

  const handleExchangeClick = (plantId: string) => {
    setExchangePlantId(plantId);
    setShowExchangeModal(true);
  };

  const handleExchangeSubmit = async (selectedUserId: string) => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/exchanges`,
        {
          plantId: exchangePlantId,
          toUserId: selectedUserId,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Передаем токен в заголовке
        }
      );
  
      console.log('Обмен предложен:', response.data);
      setShowExchangeModal(false);
    } catch (error) {
      console.error('Ошибка при предложении обмена:', error);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Добро пожаловать в PlantExchange</h1>
          <p>Обменивайтесь растениями, находите новые виды и делитесь своей зеленой коллекцией!</p>
          {isLoggedIn && <button onClick={() => setShowAddForm(true)}>Добавить растение</button>}
        </div>
      </div>
      <div className="container">
        {showAddForm && <AddPlantForm onAddPlant={handleAddPlant} onCancel={() => setShowAddForm(false)} />}
        <div className="plants-list">
          {plants.map(plant => (
            <PlantCard
              key={plant.id}
              id={plant.id}
              name={plant.name}
              description={plant.description}
              owner={plant.owner_email} // Используем почту владельца
              image={plant.image_url}
              onClick={() => setSelectedPlant(plant)}
              onExchange={handleExchangeClick} // Обмен
            />
          ))}
        </div>
      </div>
      {selectedPlant && (
        <PlantModal plant={selectedPlant} onClose={handleCloseModal} onExchange={handleExchangeClick} />
      )}
      {showExchangeModal && (
        <ExchangeModal
          plants={plants.filter(plant => plant.owner_id !== localStorage.getItem('user_id'))}
          onSelect={handleExchangeSubmit}
          onClose={() => setShowExchangeModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;