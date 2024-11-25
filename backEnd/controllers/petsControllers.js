import Pet from '../models/petsModel.js';
import { CustomError } from '../utils/errorHandler.js';

export const getPets = async (req, res, next) => {
  try {
    console.log("Incoming query parameters:", req.query);

    ///////// Filters
    const filters = { adopted: false };

    if (req.query.location && req.query.location !== '') {
      const cities = req.query.location.split(",");
      filters.location = { $regex: cities.join("|"), $options: "i" }; 
    }

    if (req.query.age && req.query.age !== '') {
      filters.age = { $in: req.query.age.split(",") };
    }

    if (req.query.size && req.query.size !== '') {
      filters.size = { $in: req.query.size.split(",") };
    }

    if (req.query.gender && req.query.gender !== '') {
      const genderFilters = req.query.gender.split(",");
      
      filters.$or = genderFilters.map((gender) => {
        if (gender === "male-neutered") {
          return { gender: "male", neutered: true };
        }
        if (gender === "female-neutered") {
          return { gender: "female", neutered: true };
        }
        if (gender === "male") {
          return { gender: "male", neutered: false };
        }
        if (gender === "female") {
          return { gender: "female", neutered: false };
        }
        return null;
      }).filter(Boolean);
    }

    if (req.query.petType && req.query.petType !== '') {
      filters.animalType = { $in: req.query.petType.split(",") };
    }

    console.log("Constructed Filters:", filters);

    const pets = await Pet.find(filters);
    res.json(pets);
  } catch (error) {
    next(new CustomError("Failed to retrieve pets", 500));
  }
};
///////////////

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