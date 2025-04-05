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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.findUserByEmail = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [userData.username, userData.email, userData.password];
    const { rows } = yield db_1.default.query(query, values);
    return rows[0];
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = yield db_1.default.query(query, [email]);
    return rows[0];
});
exports.findUserByEmail = findUserByEmail;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users';
    const { rows } = yield db_1.default.query(query);
    return rows;
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = yield db_1.default.query(query, [id]);
    return rows[0];
});
exports.getUserById = getUserById;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING *;
  `;
    const values = [userData.username, userData.email, userData.password, id];
    const { rows } = yield db_1.default.query(query, values);
    return rows[0];
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'DELETE FROM users WHERE id = $1';
    yield db_1.default.query(query, [id]);
});
exports.deleteUser = deleteUser;
