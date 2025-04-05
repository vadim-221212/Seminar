"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || '123321';
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Берем токен из заголовков
    if (!token) {
        return res.status(401).json({ message: 'Требуется аутентификация' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = { id: decoded.id }; // Добавляем user в req
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Неверный токен' });
    }
};
exports.authenticateUser = authenticateUser;
