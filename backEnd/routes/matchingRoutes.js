import express from 'express';
import {
  calculateMatch,
  getMatchResult,
  getShelterMatches
} from '../controllers/matchingControllers.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/calculate-match/:userId/:petId', auth, calculateMatch);
router.get('/result/:userId/:petId', auth, getMatchResult);
router.get('/shelter/:shelterId', auth, getShelterMatches);

export default router;