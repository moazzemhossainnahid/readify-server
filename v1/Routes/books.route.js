const express = require('express');
const booksController = require("../Controllers/books.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// add a book
router.post("/", verifyToken, booksController.addABook);

// get all books
router.get("/", booksController.getAllBooks);

// get single book
router.get("/:id", verifyToken, booksController.getSingleBook);

// delete a book
router.delete("/:id", verifyToken, booksController.deleteABook);



module.exports = router;