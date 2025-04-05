import { Exchange } from '../models/exchange';

let exchanges: Exchange[] = [

];

export const getExchanges = () => exchanges;
export const getExchangeById = (id: string) => exchanges.find(e => e.id === id);
export const createExchange = (exchange: Exchange) => exchanges.push(exchange);
export const updateExchangeStatus = (id: string, status: 'pending' | 'accepted' | 'rejected') => {
  const exchange = getExchangeById(id);
  if (exchange) exchange.status = status;
  return exchange;
};
export const deleteExchange = (id: string) => {
  exchanges = exchanges.filter(e => e.id !== id);
};

export const findCompatibleExchanges = (userId: string, plantId: string) => {
  return exchanges.filter(
    e => e.toUserId === userId && e.status === 'pending'
  );
};