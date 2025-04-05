import React, { useState } from 'react';
import './AddPlantForm.scss';

interface AddPlantFormProps {
  onAddPlant: (plant: any) => void;
  onCancel: () => void;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onAddPlant, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');

  // Получаем ID пользователя из localStorage
  const userId = localStorage.getItem('user_id'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert('Ошибка: пользователь не авторизован!');
      return;
    }

    const newPlant = {
      name,
      description,
      owner_id: Number(userId), // Преобразуем в число
      image_url, // Исправили название поля
    };

    onAddPlant(newPlant);
  };

  return (
    <div className="add-plant-form">
      <h2>Добавить новое растение</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название растения"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание растения"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ссылка на изображение"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Добавить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </form>
    </div>
  );
};

export default AddPlantForm;
