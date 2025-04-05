"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const plants_1 = __importDefault(require("./routes/plants"));
const exchange_1 = __importDefault(require("./routes/exchange"));
const history_1 = __importDefault(require("./routes/history"));
const report_1 = __importDefault(require("./routes/report"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
// Middleware для парсинга JSON
app.use(express_1.default.json());
// Middleware для CORS
app.use((0, cors_1.default)());
// Подключение роутеров
console.log("Plants router loaded");
app.use('/api/plants', plants_1.default);
app.use('/api/exchanges', exchange_1.default);
app.use('/api/history', history_1.default);
app.use('/api/reports', report_1.default);
app.use('/api/users', users_1.default);
app.use('/api/auth', auth_1.default);
exports.default = app;
