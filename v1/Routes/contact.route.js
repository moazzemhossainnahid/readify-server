const express = require("express");
const contactsController = require("../Controllers/contact.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a contact
router.post("/", verifyToken, contactsController.saveAContact);

// get all contacts
router.get("/", contactsController.getAllContacts);

// get single contact
router.get("/:id", verifyToken, contactsController.getSingleContact);

// delete a contact
router.delete("/:id", verifyToken, contactsController.deleteAContact);

module.exports = router;
