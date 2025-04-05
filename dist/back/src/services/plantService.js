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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlant = exports.updatePlant = exports.addPlant = exports.getPlantById = exports.getPlants = void 0;
// src/services/plantService.ts
const plant_1 = require("../models/plant");
const getPlants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, plant_1.getPlants)();
});
exports.getPlants = getPlants;
const getPlantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, plant_1.getPlantById)(id);
});
exports.getPlantById = getPlantById;
const addPlant = (plantData) => __awaiter(void 0, void 0, void 0, function* () {
    // Проверяем, что все обязательные поля присутствуют
    if (!plantData.name || !plantData.description || !plantData.owner_id || !plantData.image_url) {
        throw new Error('Missing required fields');
    }
    // Создаем растение в базе данных
    return yield (0, plant_1.createPlant)(plantData.name, plantData.description, plantData.owner_id, plantData.image_url);
});
exports.addPlant = addPlant;
const updatePlant = (id, plantData) => __awaiter(void 0, void 0, void 0, function* () {
    const plant = yield (0, plant_1.getPlantById)(id);
    if (plant) {
        const updatedPlant = Object.assign(Object.assign({}, plant), plantData);
        yield (0, plant_1.updatePlant)(id, updatedPlant);
        return updatedPlant;
    }
    return undefined;
});
exports.updatePlant = updatePlant;
const deletePlant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, plant_1.deletePlant)(id);
});
exports.deletePlant = deletePlant;
