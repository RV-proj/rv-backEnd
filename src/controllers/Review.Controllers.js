import reviewModel from "../models/Review.Model.js";

// get
async function getReviews(req, res, next) {
  try {
    const allReviews = await reviewModel.getAllReviews();

    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default { getReviews };
