// src/services/plantService.ts
import { Plant, getPlants as getPlantsFromDb, getPlantById as getPlantByIdFromDb, createPlant as createPlantInDb, updatePlant as updatePlantInDb, deletePlant as deletePlantFromDb } from '../models/plant';

export const getPlants = async (): Promise<Plant[]> => {
  return await getPlantsFromDb();
};

export const getPlantById = async (id: string): Promise<Plant | undefined> => {
  return await getPlantByIdFromDb(id);
};

export const addPlant = async (plantData: Omit<Plant, 'id' | 'created_at'>): Promise<Plant> => {
    // Проверяем, что все обязательные поля присутствуют
    if (!plantData.name || !plantData.description || !plantData.owner_id || !plantData.image_url) {
      throw new Error('Missing required fields');
    }
  
    // Создаем растение в базе данных
    return await createPlantInDb(plantData.name, plantData.description, plantData.owner_id, plantData.image_url);
  };
export const updatePlant = async (id: string, plantData: Partial<Plant>): Promise<Plant | undefined> => {
  const plant = await getPlantByIdFromDb(id);
  if (plant) {
    const updatedPlant = { ...plant, ...plantData };
    await updatePlantInDb(id, updatedPlant);
    return updatedPlant;
  }
  return undefined;
};

export const deletePlant = async (id: string): Promise<void> => {
  await deletePlantFromDb(id);
};