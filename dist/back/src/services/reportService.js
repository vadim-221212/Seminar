"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostPopularPlants = void 0;
const getMostPopularPlants = (plants, history) => {
    // Логика для определения самых популярных растений
    const plantPopularity = new Map();
    history.forEach(entry => {
        if (plantPopularity.has(entry.plantId)) {
            plantPopularity.set(entry.plantId, plantPopularity.get(entry.plantId) + 1);
        }
        else {
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
exports.getMostPopularPlants = getMostPopularPlants;
