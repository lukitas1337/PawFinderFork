import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFav,
  updateFav,
  deleteFav,
  getApplication,
  updateApplication,
  deleteApplication

} from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.get('/:id/favorites', getFav);
usersRouter.put('/pets/:id', updateFav);
usersRouter.delete('/pets/:id', deleteFav);
usersRouter.get('/pets/:id/application', getApplication); 
usersRouter.put('/pets/:id/application', updateApplication); 
usersRouter.delete('/pets/:id/application', deleteApplication);

export default usersRouter;
