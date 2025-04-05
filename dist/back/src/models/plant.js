"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlant = exports.updatePlant = exports.getPlantById = exports.getPlants = exports.createPlant = void 0;
// src/models/plant.ts
const db_1 = __importDefault(require("../config/db"));
const createPlant = (name, description, ownerId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO plants (name, description, owner_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, description, ownerId, imageUrl];
    const { rows } = yield db_1.default.query(query, values);
    return rows[0];
});
exports.createPlant = createPlant;
const getPlants = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT plants.*, users.email as owner_email
    FROM plants
    JOIN users ON plants.owner_id = users.id;
  `;
    const { rows } = yield db_1.default.query(query);
    return rows;
});
exports.getPlants = getPlants;
const getPlantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT plants.*, users.email as owner_email
    FROM plants
    JOIN users ON plants.owner_id = users.id
    WHERE plants.id = $1;
  `;
    const { rows } = yield db_1.default.query(query, [id]);
    return rows[0];
});
exports.getPlantById = getPlantById;
const updatePlant = (id, plantData) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'UPDATE plants SET name = $1, description = $2, owner_id = $3, image_url = $4 WHERE id = $5 RETURNING *';
    const values = [plantData.name, plantData.description, plantData.owner_id, plantData.image_url, id];
    const { rows } = yield db_1.default.query(query, values);
    return rows[0];
});
exports.updatePlant = updatePlant;
const deletePlant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'DELETE FROM plants WHERE id = $1';
    yield db_1.default.query(query, [id]);
});
exports.deletePlant = deletePlant;
