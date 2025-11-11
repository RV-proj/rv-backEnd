import express from "express";
import UserController from "../controllers/User.Controller.js";

const router = express.Router();

// get
router.get("/", UserController.getUsers);

// post
router.post("/", UserController.postUser);

// delete
router.delete("/:id", UserController.deleteUser);

// single user
router.get("/:id", UserController.getSingleUser);

export default router;
