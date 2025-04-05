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
exports.addToHistory = exports.getHistory = void 0;
const history_1 = require("../models/history");
const getHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, history_1.getHistory)();
});
exports.getHistory = getHistory;
const addToHistory = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, history_1.addToHistory)(entry);
});
exports.addToHistory = addToHistory;
