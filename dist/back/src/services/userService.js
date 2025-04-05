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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_1 = require("../models/user");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_1.getUsers)();
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_1.getUserById)(Number(id)); // Преобразуем id в number
});
exports.getUserById = getUserById;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = yield (0, user_1.findUserByEmail)(userData.email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    // Если пользователь не существует, создаем нового
    return yield (0, user_1.createUser)(userData);
});
exports.createUser = createUser;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_1.updateUser)((id), userData); // Преобразуем id в number
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_1.deleteUser)((id)); // Преобразуем id в number
});
exports.deleteUser = deleteUser;
