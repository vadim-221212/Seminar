import express from 'express';
import * as reportsController from '../controllers/reports';

const router = express.Router();

router.get('/most-popular-plants', reportsController.getMostPopularPlants);
router.get('/most-active-users', reportsController.getMostActiveUsers);

export default router;