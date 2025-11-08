import express from "express";
import orderController from "../controllers/Order.Controller.js";

const router = express.Router();

// get
router.get("/", orderController.getOrder);

export default router;
