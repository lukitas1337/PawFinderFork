import Shelter from "../models/SheltersModel.js";
import { CustomError } from '../utils/errorHandler.js';

export const getShelters = async (req, res, next) => {
    try {
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (error) {
        next(new CustomError('Failed to retrieve shelters', 500));
    }
};

export const getShelterById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const shelter = await Shelter.findById(id);
        if (!shelter) {
            throw new CustomError('Shelter not found', 404);
        }
        res.json(shelter);
    } catch (error) {
        next(new CustomError('Failed to retrieve shelter', 500));
    }
};

export const createShelter = async (req, res, next) => {
    const shelterData = req.body;
    try {
        const shelter = await Shelter.create(shelterData);
        res.status(201).json(shelter);
    } catch (error) {
        console.error("Error creating shelter:", error);
        next(new CustomError('Failed to create shelter', 500));
    }
};

export const updateShelter = async (req, res, next) => {
    const { id } = req.params;
    const shelterData = req.body;
    try {
        const shelter = await Shelter.findById(id);
        if (!shelter) {
            throw new CustomError('Shelter not found', 404);
        } 
        Object.assign(shelter, shelterData);
        await shelter.save();
        res.json(shelter);
    } catch (error) {
        next(new CustomError('Failed to update shelter', 500));
    }
};

export const deleteShelter = async (req, res, next) => {
    const { id } = req.params;
    try {
        const shelter = await Shelter.findById(id);
        if (!shelter) {
            throw new CustomError('Shelter not found', 404);
        }
        await shelter.deleteOne();
        res.json({ message: "Shelter deleted successfully" });
    } catch (error) {
        next(new CustomError('Failed to delete shelter', 500));
    }
};