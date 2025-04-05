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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCompatibleExchanges = exports.deleteExchange = exports.updateExchangeStatus = exports.createExchange = exports.getExchange = exports.getExchanges = void 0;
const exchangeService = __importStar(require("../services/exchangeService"));
const user_1 = require("../models/user"); // Импортируем функцию для получения пользователя по ID
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || '123321'; // Секретный ключ для проверки токена
const getExchanges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchanges = exchangeService.getExchanges();
        // Для каждого обмена получаем email отправителя и получателя
        const exchangesWithEmails = yield Promise.all(exchanges.map((exchange) => __awaiter(void 0, void 0, void 0, function* () {
            const fromUser = yield (0, user_1.getUserById)(Number(exchange.fromUserId));
            const toUser = yield (0, user_1.getUserById)(Number(exchange.toUserId));
            return Object.assign(Object.assign({}, exchange), { fromUserEmail: (fromUser === null || fromUser === void 0 ? void 0 : fromUser.email) || 'Неизвестно', toUserEmail: (toUser === null || toUser === void 0 ? void 0 : toUser.email) || 'Неизвестно' });
        })));
        res.json(exchangesWithEmails);
    }
    catch (error) {
        console.error('Ошибка при получении обменов:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
exports.getExchanges = getExchanges;
const getExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchange = exchangeService.getExchangeById(req.params.id);
        if (!exchange) {
            res.status(404).json({ message: 'Exchange not found' });
            return;
        }
        // Получаем email отправителя и получателя
        const fromUser = yield (0, user_1.getUserById)(Number(exchange.fromUserId));
        const toUser = yield (0, user_1.getUserById)(Number(exchange.toUserId));
        const exchangeWithEmails = Object.assign(Object.assign({}, exchange), { fromUserEmail: (fromUser === null || fromUser === void 0 ? void 0 : fromUser.email) || 'Неизвестно', toUserEmail: (toUser === null || toUser === void 0 ? void 0 : toUser.email) || 'Неизвестно' });
        res.json(exchangeWithEmails);
    }
    catch (error) {
        console.error('Ошибка при получении обмена:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
exports.getExchange = getExchange;
const createExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { plantId, toUserId } = req.body;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Необходима авторизация' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const fromUserId = decoded.id;
        if (fromUserId === toUserId) {
            res.status(400).json({ message: 'Нельзя предложить обмен самому себе' });
            return;
        }
        const newExchange = {
            id: Date.now().toString(),
            plantId,
            fromUserId,
            toUserId,
            fromUserEmail: decoded.email, // Почта отправителя
            toUserEmail: '', // Почта получателя будет заполнена позже
            status: 'pending',
            createdAt: new Date(),
        };
        // Получаем почту получателя
        const toUser = yield (0, user_1.getUserById)(Number(toUserId));
        newExchange.toUserEmail = (toUser === null || toUser === void 0 ? void 0 : toUser.email) || 'Неизвестно';
        exchangeService.createExchange(newExchange);
        res.status(201).json(newExchange);
    }
    catch (error) {
        console.error('Ошибка при создании обмена:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
exports.createExchange = createExchange;
const updateExchangeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedExchange = yield exchangeService.updateExchangeStatus(id, status);
        if (updatedExchange) {
            res.json(updatedExchange);
        }
        else {
            res.status(404).json({ message: 'Обмен не найден' });
        }
    }
    catch (error) {
        console.error('Ошибка при обновлении статуса обмена:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
exports.updateExchangeStatus = updateExchangeStatus;
const deleteExchange = (req, res) => {
    exchangeService.deleteExchange(req.params.id);
    res.status(204).send();
};
exports.deleteExchange = deleteExchange;
const findCompatibleExchanges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, plantId } = req.query;
    if (!userId || !plantId) {
        res.status(400).json({ message: 'Необходимо указать userId и plantId' });
        return;
    }
    try {
        const compatibleExchanges = exchangeService.findCompatibleExchanges(userId, plantId);
        // Для каждого обмена получаем email отправителя и получателя
        const exchangesWithEmails = yield Promise.all(compatibleExchanges.map((exchange) => __awaiter(void 0, void 0, void 0, function* () {
            const fromUser = yield (0, user_1.getUserById)(Number(exchange.fromUserId));
            const toUser = yield (0, user_1.getUserById)(Number(exchange.toUserId));
            return Object.assign(Object.assign({}, exchange), { fromUserEmail: (fromUser === null || fromUser === void 0 ? void 0 : fromUser.email) || 'Неизвестно', toUserEmail: (toUser === null || toUser === void 0 ? void 0 : toUser.email) || 'Неизвестно' });
        })));
        res.json(exchangesWithEmails);
    }
    catch (error) {
        console.error('Ошибка при поиске совместимых обменов:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
exports.findCompatibleExchanges = findCompatibleExchanges;
