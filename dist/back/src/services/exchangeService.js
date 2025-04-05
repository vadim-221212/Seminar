"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCompatibleExchanges = exports.deleteExchange = exports.updateExchangeStatus = exports.createExchange = exports.getExchangeById = exports.getExchanges = void 0;
let exchanges = [];
const getExchanges = () => exchanges;
exports.getExchanges = getExchanges;
const getExchangeById = (id) => exchanges.find(e => e.id === id);
exports.getExchangeById = getExchangeById;
const createExchange = (exchange) => exchanges.push(exchange);
exports.createExchange = createExchange;
const updateExchangeStatus = (id, status) => {
    const exchange = (0, exports.getExchangeById)(id);
    if (exchange)
        exchange.status = status;
    return exchange;
};
exports.updateExchangeStatus = updateExchangeStatus;
const deleteExchange = (id) => {
    exchanges = exchanges.filter(e => e.id !== id);
};
exports.deleteExchange = deleteExchange;
const findCompatibleExchanges = (userId, plantId) => {
    return exchanges.filter(e => e.toUserId === userId && e.status === 'pending');
};
exports.findCompatibleExchanges = findCompatibleExchanges;
