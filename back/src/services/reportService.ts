// src/services/reportService.ts
import { Plant } from '../models/plant';
import { History } from '../models/history';

export const getMostPopularPlants = (plants: Plant[], history: History[]): Plant[] => {
  // Логика для определения самых популярных растений
  const plantPopularity = new Map<number, number>();

  history.forEach(entry => {
    if (plantPopularity.has(entry.plantId)) {
      plantPopularity.set(entry.plantId, plantPopularity.get(entry.plantId)! + 1);
    } else {
      plantPopularity.set(entry.plantId, 1);
    }
  });

  // Сортируем растения по популярности
  const sortedPlants = plants.sort((a, b) => {
    const aPopularity = plantPopularity.get(a.id) || 0;
    const bPopularity = plantPopularity.get(b.id) || 0;
    return bPopularity - aPopularity;
  });

  return sortedPlants;
};