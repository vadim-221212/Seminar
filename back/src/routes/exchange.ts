import express from 'express';
import * as exchangesController from '../controllers/exchange';

const router = express.Router();

router.get('/', exchangesController.getExchanges);
router.get('/:id', exchangesController.getExchange);
router.post('/', exchangesController.createExchange); // Используем новую функцию
router.put('/:id/status', exchangesController.updateExchangeStatus);
router.delete('/:id', exchangesController.deleteExchange);
router.get('/compatible', exchangesController.findCompatibleExchanges);

export default router;