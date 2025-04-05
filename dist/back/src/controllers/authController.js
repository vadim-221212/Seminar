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
exports.getMe = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET || '123321'; // Заменить на .env
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Проверка, существует ли пользователь
        const existingUser = yield (0, user_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Хеширование пароля
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Создание пользователя
        const newUser = yield (0, user_1.createUser)({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email } });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_1.findUserByEmail)(email);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        // Возвращаем токен и информацию о пользователе
        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: { id: user.id, email: user.email, username: user.username }
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer token
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Принимаем как any для доступа к id
        const user = yield (0, user_1.getUserById)(Number(decoded.id)); // Преобразуем id в число
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user: { id: user.id, username: user.username, email: user.email } });
    }
    catch (error) {
        console.error('Error during profile fetch:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMe = getMe;
