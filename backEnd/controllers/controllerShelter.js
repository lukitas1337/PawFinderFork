import Shelter from "../models/Shelter.js";

export const getShelters = async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getShelterById = async (req, res) => {
    const { id } = req.params;
    try {
        const shelter = await Shelter.findById(id);
        if (shelter) {
            res.json(shelter);
        } else {
            res.status(404).json({ error: "Shelter not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createShelter = async (req, res) => {
    const shelterData = req.body;
    try {
        const shelter = await Shelter.create(shelterData);
        res.status(201).json(shelter);
    } catch (error) {
        console.error("Error creating shelter:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateShelter = async (req, res) => {
    const { id } = req.params;
    const shelterData = req.body;
    try {
        const shelter = await Shelter.findById(id);
        if (shelter) {
            Object.assign(shelter, shelterData);
            await shelter.save();
            res.json(shelter);
        } else {
            res.status(404).json({ error: "Shelter not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteShelter = async (req, res) => {
    const { id } = req.params;
    try {
        const shelter = await Shelter.findById(id);
        if (shelter) {
            await shelter.remove();
            res.json({ message: "Shelter deleted successfully" });
        } else {
            res.status(404).json({ error: "Shelter not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};