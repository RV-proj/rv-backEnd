import express from "express";
import UserController from "../controllers/User.Controller.js";

const router = express.Router();

// get
router.get("/", UserController.getUsers);

export default router;
