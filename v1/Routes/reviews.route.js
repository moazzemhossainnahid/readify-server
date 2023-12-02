const express = require("express");
const reviewsController = require("../Controllers/reviews.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a service
router.post("/", verifyToken, reviewsController.AddAReview);

// get all service
router.get("/", reviewsController.getAllReviews);

// get single service
router.get("/:id", verifyToken, reviewsController.getSingleReview);

// delete a service
router.delete("/:id", verifyToken, reviewsController.deleteAReview);

module.exports = router;
