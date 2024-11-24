import { Router } from "express";
// import auth from '../middleware/auth.js';
import {
  getShelters,
  getShelterById,
  createShelter,
  updateShelter,
  deleteShelter,
} from "../controllers/shelterControllers.js";

const shelterRouter = Router();

shelterRouter.get("/", getShelters);
shelterRouter.get("/:id", getShelterById);
shelterRouter.post("/", createShelter);
shelterRouter.patch("/:id", updateShelter);
shelterRouter.delete("/:id", deleteShelter);

export default shelterRouter;
