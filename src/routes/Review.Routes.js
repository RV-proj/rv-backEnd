import express from "express";
import reviewController from "../controllers/Review.Controllers.js";

const router = express.Router();

// get
router.get("/", reviewController.getReviews);

// post
router.post("/", reviewController.addReview);

// delete
router.delete("/:id", reviewController.deleteReview);

export default router;
