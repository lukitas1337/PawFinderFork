import AdPet from "../models/adPetsModel.js";
import { CustomError } from "../utils/errorHandler.js";
import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontEnd/public/images/petAds");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${req.body.animalType}.${req.body.name}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("the file is not an image", false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadPhoto = upload.single("pictures");
export const getAdPets = async (req, res, next) => {
  try {
    const adPets = await AdPet.find();
    res.status(200).json(adPets);
  } catch (error) {
    next(new CustomError(error.message || "Failed to get all the pets", 400));
  }
};

export const getAdPetById = async (req, res, next) => {
  try {
    const adPet = await Pet.findById(req.params.id);
    if (!adPet) {
      throw new CustomError("Pet not found", 404);
    }
    res.json(adPet);
  } catch (error) {
    next(new CustomError(error.message || "Failed to retrieve pet", 404));
  }
};

export const createAdPet = async (req, res, next) => {
  try {
    let adPet;
    if (req.file) {
      adPet = new AdPet({
        ...req.body,
        pictures: req.file.filename,
      });
    } else {
      adPet = new AdPet({
        ...req.body,
      });
    }

    await adPet.save();
    res.status(201).json(adPet);
  } catch (error) {
    next(new CustomError(error.message || "Failed to create pet", 400));
  }
};

export const updateAdPet = async (req, res, next) => {
  try {
    const adPet = await Pet.findById(req.params.id);
    if (!adPet) {
      throw new CustomError("Pet not found", 404);
    }

    Object.assign(adPet, req.body);
    await adPet.save();
    res.json(adPet);
  } catch (error) {
    next(new CustomError(error.message || "Failed to update pet", 400));
  }
};

export const deleteAdPet = async (req, res, next) => {
  try {
    const adPet = await AdPet.findById(req.params.id);
    if (!adPet) {
      throw new CustomError("Pet not found", 404);
    }

    await adPet.deleteOne();
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message || "Failed to delete pet", 400));
  }
};
