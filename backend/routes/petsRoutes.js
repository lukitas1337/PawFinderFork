import { Router } from 'express';
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} from '../controllers/petsControllers.js';

const petsRouter = Router();

petsRouter.get('/', getPets);
petsRouter.get('/:id', getPetById);
petsRouter.post('/', createPet);
petsRouter.put('/:id', updatePet);
petsRouter.delete('/:id', deletePet);

export default petsRouter;