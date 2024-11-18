import Pet from "../models/Pet.js";

export const getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPetById = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet.findById(id);
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createPet = async (req, res) => {
    const petData = req.body;
    try {
        const pet = await Pet.create(petData);
        res.status(201).json(pet);
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updatePet = async (req, res) => {
    const { id } = req.params;
    const petData = req.body;
    try {
        const pet = await Pet.findById(id);
        if (pet) {
            Object.assign(pet, petData);
            await pet.save();
            res.json(pet);
        } else {
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deletePet = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet.findById(id);
        if (pet) {
            await pet.remove();
            res.json({ message: "Pet deleted successfully" });
        } else {
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};