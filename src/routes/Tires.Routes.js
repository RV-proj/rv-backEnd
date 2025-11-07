import express from "express";
import TiresController from "../controllers/Tires.Controller.js";

const router = express.Router();

// get
router.get("/", TiresController.getTires);

export default router;
