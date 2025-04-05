import express from 'express';
import * as plantsController from '../controllers/plants';

const router = express.Router();

router.get('/', plantsController.getPlants);
router.get('/:id', plantsController.getPlant);
router.post('/', plantsController.createPlant);
router.put('/:id', plantsController.updatePlant);
router.delete('/:id', plantsController.deletePlant);

export default router;