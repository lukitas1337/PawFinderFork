import { Router } from 'express';
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} from '../controllers/petsControllers.js';

const petsRouter = Router();

router.get('/', getPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default petsRouter;