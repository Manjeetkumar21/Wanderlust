const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews")

//REVIEWS POST Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//REVIEWS DELETE Route
router.delete(
  "/:reviewId", isLoggedIn, isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
