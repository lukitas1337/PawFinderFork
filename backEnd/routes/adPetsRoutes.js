import { Router } from "express";

import {
  getAdPets,
  getAdPetById,
  createAdPet,
  updateAdPet,
  deleteAdPet,
  uploadPhoto,
} from "../controllers/adPetsControllers.js";

const adPetsRouter = Router();

adPetsRouter.get("/", getAdPets);
adPetsRouter.get("/:id", getAdPetById);
adPetsRouter.post("/", uploadPhoto, createAdPet);
adPetsRouter.put("/:id", updateAdPet);
adPetsRouter.delete("/:id", deleteAdPet);

export default adPetsRouter;
