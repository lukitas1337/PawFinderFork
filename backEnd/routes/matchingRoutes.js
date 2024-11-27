import express from 'express';
import {
  calculateMatch,
  getMatchResult,
  calculateBulkMatches, 
  getMatchResultWithDetails,
  getShelterMatches
} from '../controllers/matchingControllers.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/calculate-match/:userId/:petId', auth, calculateMatch);
router.get('/result/:userId/:petId', auth, getMatchResult);
router.get('/shelter/:shelterId', auth, getShelterMatches);
router.post('/calculate-bulk-matches/:userId', calculateBulkMatches);
router.get('/result-with-details/:userId/:petId', getMatchResultWithDetails);

export default router;