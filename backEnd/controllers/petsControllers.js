import Pet from '../models/petsModel.js';
import { CustomError } from '../utils/errorHandler.js';

export const getPets = async (req, res, next) => {
  try {
    const pets = await Pet.find({ adopted: false });
    res.json(pets);
  } catch (error) {
    next(new CustomError('Failed to retrieve pets', 500));
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      throw new CustomError('Pet not found', 404);
    }
    res.json(pet);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to retrieve pet', 404));
  }
};

export const createPet = async (req, res, next) => {
  try {
    const pet = new Pet({
      ...req.body,
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to create pet', 400));
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      throw new CustomError('Pet not found', 404);
    }
    
    Object.assign(pet, req.body);
    await pet.save();
    res.json(pet);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update pet', 400));
  }
};

export const deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      throw new CustomError('Pet not found', 404);
    }
    
    await pet.deleteOne();
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete pet', 400));
  }
};