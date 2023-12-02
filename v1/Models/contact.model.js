const mongoose = require("mongoose");
const validator = require("validator");

const contactsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: false,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;
