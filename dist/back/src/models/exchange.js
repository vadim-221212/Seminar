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
exports.createExchange = void 0;
// src/models/exchange.ts
const db_1 = __importDefault(require("../config/db"));
const user_1 = require("../models/user"); // Импортируем функцию для получения пользователя по ID
const createExchange = (exchangeData) => __awaiter(void 0, void 0, void 0, function* () {
    const fromUser = yield (0, user_1.getUserById)(Number(exchangeData.fromUserId));
    const toUser = yield (0, user_1.getUserById)(Number(exchangeData.toUserId));
    const query = `
    INSERT INTO exchanges (plant_id, from_user_id, to_user_id, status, from_user_email, to_user_email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const values = [
        exchangeData.plantId,
        exchangeData.fromUserId,
        exchangeData.toUserId,
        exchangeData.status,
        (fromUser === null || fromUser === void 0 ? void 0 : fromUser.email) || 'Неизвестно', // Добавляем email отправителя
        (toUser === null || toUser === void 0 ? void 0 : toUser.email) || 'Неизвестно', // Добавляем email получателя
    ];
    const { rows } = yield db_1.default.query(query, values);
    return rows[0];
});
exports.createExchange = createExchange;
