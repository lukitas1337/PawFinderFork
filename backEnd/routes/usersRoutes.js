import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersControllers.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
