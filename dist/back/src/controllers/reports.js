"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getMostActiveUsers = exports.getMostPopularPlants = void 0;
const reportService = __importStar(require("../services/reportService"));
const plantService = __importStar(require("../services/plantService"));
const historyService = __importStar(require("../services/historyService"));
const userService = __importStar(require("../services/userService"));
const getMostPopularPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Используем await для получения данных
        const plants = yield plantService.getPlants();
        const history = yield historyService.getHistory();
        // Передаем данные в reportService
        const mostPopularPlants = reportService.getMostPopularPlants(plants, history);
        res.json(mostPopularPlants);
    }
    catch (error) {
        console.error('Error fetching most popular plants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMostPopularPlants = getMostPopularPlants;
const getMostActiveUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Получаем историю и пользователей
        const history = yield historyService.getHistory();
        const users = yield userService.getUsers();
        // Логика для определения самых активных пользователей
        const userActivity = new Map(); // Делаем ключи строками
        history.forEach(entry => {
            const userId = String(entry.fromUserId); // Приводим к строковому типу
            if (userActivity.has(userId)) {
                userActivity.set(userId, userActivity.get(userId) + 1);
            }
            else {
                userActivity.set(userId, 1);
            }
        });
        // Сортируем пользователей по активности
        const sortedUsers = users.sort((a, b) => {
            const aActivity = userActivity.get(String(a.id)) || 0; // Приводим к строке при получении
            const bActivity = userActivity.get(String(b.id)) || 0; // Приводим к строке при получении
            return bActivity - aActivity;
        });
        res.json(sortedUsers);
    }
    catch (error) {
        console.error('Error fetching most active users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMostActiveUsers = getMostActiveUsers;
