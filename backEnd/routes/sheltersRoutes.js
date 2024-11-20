import express from 'express';
// import auth from '../middleware/auth.js';
import { getShelters, getShelterById, createShelter, updateShelter, deleteShelter } from '../controllers/shelterControllers.js';

const router = express.Router();

router.post('/', createShelter);

router.patch('/:id', updateShelter);

router.delete('/:id', deleteShelter);

router.get('/', getShelters);

router.get('/:id', getShelterById);

export default router;