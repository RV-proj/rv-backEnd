import express from "express";
import reviewController from "../controllers/Review.Controllers.js";

const router = express.Router();

// get
router.get("/", reviewController.getReviews);

// post
router.post("/", reviewController.addReview);

router.delete("/", (req, res, next) => {});

export default router;
