// src/models/plant.ts
import {pool} from '../config/db';

export interface Plant {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  owner_email?: string; // Делаем поле необязательным
  image_url: string;
  created_at: Date;
}
  export interface NewPlant {
    name: string;
    description: string;
    owner_id: number;
    image_url: string;
  }

export const createPlant = async (name: string, description: string, ownerId: number, imageUrl: string): Promise<Plant> => {
  const query = 'INSERT INTO plants (name, description, owner_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [name, description, ownerId, imageUrl];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getPlants = async (): Promise<Plant[]> => {
  const query = `
    SELECT plants.*, users.email as owner_email
    FROM plants
    JOIN users ON plants.owner_id = users.id;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getPlantById = async (id: string): Promise<Plant | undefined> => {
  const query = `
    SELECT plants.*, users.email as owner_email
    FROM plants
    JOIN users ON plants.owner_id = users.id
    WHERE plants.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const updatePlant = async (id: string, plantData: Partial<Plant>): Promise<Plant | undefined> => {
  const query = 'UPDATE plants SET name = $1, description = $2, owner_id = $3, image_url = $4 WHERE id = $5 RETURNING *';
  const values = [plantData.name, plantData.description, plantData.owner_id, plantData.image_url, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deletePlant = async (id: string): Promise<void> => {
  const query = 'DELETE FROM plants WHERE id = $1';
  await pool.query(query, [id]);
};