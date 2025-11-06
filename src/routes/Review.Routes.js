import express from "express";
import reviewController from "../controllers/Review.Controllers.js";

const router = express.Router();

router.get("/", reviewController.getReviews);

router.post("/", (req, res, next) => {});

router.delete("/", (req, res, next) => {});

export default router;
