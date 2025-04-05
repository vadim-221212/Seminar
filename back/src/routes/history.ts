import express from 'express';
import * as historyController from '../controllers/history';

const router = express.Router();

router.get('/', historyController.getHistory);

export default router;