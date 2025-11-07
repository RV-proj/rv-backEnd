import express from "express";
import TiresController from "../controllers/Tiers.Controller.js";

const router = express.Router();

// get
router.get("/", TiresController.getTires);

export default router;
