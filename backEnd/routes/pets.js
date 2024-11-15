import express from 'express';
import Pet from '../models/Pet.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new pet
router.post('/', auth, async (req, res) => {
  try {
    const pet = new Pet({
      ...req.body,
      ownerId: req.user.userId // This comes from the auth middleware
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find({ adopted: false });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a pet
router.patch('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, ownerId: req.user.userId });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found or unauthorized' });
    }
    
    Object.assign(pet, req.body);
    await pet.save();
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a pet
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, ownerId: req.user.userId });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found or unauthorized' });
    }
    
    await pet.deleteOne();
    res.json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;