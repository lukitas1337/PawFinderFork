import express from 'express';
import {
  register,
  login,
  logout,
  googleAuth,
  googleCallback,
  checkSession
} from '../controllers/authControllers.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/session', auth, checkSession);

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router;