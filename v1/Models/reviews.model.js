const mongoose = require("mongoose");
const validator = require("validator");


const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "Name is required"],
        },
        image: {
            required: true,
            type: String,
            validate: [validator.isURL, "Please provide Product Image URL"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
        },
        review: {
            type: String,
            trim: true,
            required: [true, "Review is required"],
        },
        rating: {
            type: Number,
            trim: true,
            required: [true, "Rating is required"],
        },
    },
    {
        timestamps: true,
    }

);


const Reviews = mongoose.model("reviews", reviewSchema);

module.exports = Reviews;