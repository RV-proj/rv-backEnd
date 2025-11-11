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

// post
async function addReview(req, res, next) {
  try {
    const { review, userName } = req.body;

    if (!review || !userName) {
      return res
        .status(400)
        .json({ message: "review and userName are required" });
    }

    const newReview = await reviewModel.createReview({ review, userName });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// delete
async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedReview = await reviewModel.deleteReview(id);

    if (!deletedReview || deletedReview.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review deleted successfully",
      deletedReview,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default { getReviews, addReview, deleteReview };
