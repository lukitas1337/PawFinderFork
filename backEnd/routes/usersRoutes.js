import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFav,
  updateFav,
  deleteFav
} from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.get('/:id/favorites', getFav);
usersRouter.put('/pets/:id', updateFav);
usersRouter.delete('/pets/:id', deleteFav);

export default usersRouter;
