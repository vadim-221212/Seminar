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
exports.addToHistory = exports.getHistory = void 0;
const db_1 = __importDefault(require("../config/db"));
const getHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM history';
    const { rows } = yield db_1.default.query(query);
    return rows;
});
exports.getHistory = getHistory;
const addToHistory = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    INSERT INTO history (exchange_id, plant_id, from_user_id, to_user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [entry.exchangeId, entry.plantId, entry.fromUserId, entry.toUserId];
    const { rows } = yield db_1.default.query(query, values);
    return rows[0];
});
exports.addToHistory = addToHistory;
