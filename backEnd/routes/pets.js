import express from 'express';
// import auth from '../middleware/auth.js';
import { getPets, getPetById, createPet, updatePet, deletePet } from '../controllers/controllerPet.js';

const router = express.Router();

router.post('/', createPet);

router.patch('/:id', updatePet);

router.delete('/:id', deletePet);

router.get('/', getPets);

router.get('/:id', getPetById);

export default router;