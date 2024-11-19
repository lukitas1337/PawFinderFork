import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  googleAuth,
  googleCallback,
  checkSession,
} from '../controllers/usersController.js';
import auth from '../middleware/auth.js';

const usersRouter = Router();

usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/logout', logoutUser);
usersRouter.get('/session', auth, checkSession);

usersRouter.get('/google', googleAuth);
usersRouter.get('/google/callback', googleCallback);

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;