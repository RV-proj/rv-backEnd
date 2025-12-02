import express from "express";
import UserController from "../controllers/User.Controller.js";
import { verifyToken } from "../middlewares/Token.Middlewares.js";

const router = express.Router();

// get
router.get("/", verifyToken, UserController.getUsers);

// post
router.post("/", UserController.postUser);

// delete
router.delete("/:id", UserController.deleteUser);

// single user
router.get("/:id", verifyToken, UserController.getSingleUser);

// get user by email
router.get("/email/:email", UserController.getUserEmail);

export default router;
