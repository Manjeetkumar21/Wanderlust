const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../middleware");
const listingController = require("../controllers/listings");
const { storage } = require("../cloudConfig");

const multer = require("multer");
const upload = multer({ storage });

//INDEX AND CREATE ROUTE
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//FILTERS

router.get("/category/:id", wrapAsync(listingController.filter));

// 1. NEW Form Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SHOW AND UPDATE ROUTE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//EDIT Form Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
