import { Request, Response } from 'express';
import * as plantService from '../services/plantService';

export const getPlants = async (req: Request, res: Response) => {
  try {
    const plants = await plantService.getPlants();
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPlant = async (req: Request, res: Response) => {
  try {
    const plantId = req.params.id;
    const plant = await plantService.getPlantById(plantId);

    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ message: 'Plant not found' });
    }
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createPlant = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Request body:', req.body); // Логирование тела запроса
  
      const { name, description, owner_id, image_url } = req.body;
  
      if (!name || !description || !owner_id || !image_url) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      const newPlant = await plantService.addPlant({ name, description, owner_id, image_url });
      res.status(201).json(newPlant);
    } catch (error) {
      console.error('Error creating plant:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const updatePlant = async (req: Request, res: Response): Promise<void> => {
    try {
      const plantId = req.params.id;
      const { name, description, owner_id, image_url } = req.body;
  
      if (!name || !description || !owner_id || !image_url) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      const updatedPlant = await plantService.updatePlant(plantId, { name, description, owner_id, image_url });
  
      if (updatedPlant) {
        res.json(updatedPlant);
      } else {
        res.status(404).json({ message: 'Plant not found' });
      }
    } catch (error) {
      console.error('Error updating plant:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const deletePlant = async (req: Request, res: Response) => {
  try {
    const plantId = req.params.id; // Получаем ID растения из параметров запроса

    // Удаляем растение
    await plantService.deletePlant(plantId);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};