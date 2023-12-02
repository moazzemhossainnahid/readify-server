const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');
require('dotenv').config();



app.use(cors());
app.use(express.json());



// import routes
const usersRoute = require('./v1/Routes/users.route');
const booksRoute = require('./v1/Routes/books.route');
const ordersRoute = require('./v1/Routes/orders.route');
const reviewsRoute = require('./v1/Routes/reviews.route');
// const stafsRoute = require('./v1/Routes/stafs.route');
const contactsRoute = require('./v1/Routes/contact.route');
const sslsRoute = require('./v1/Routes/ssl.route');





// declare routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/books', booksRoute);
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/reviews', reviewsRoute);
// app.use('/api/v1/stafs', stafsRoute);
app.use('/api/v1/contacts', contactsRoute);
app.use('/api/v1/ssl', sslsRoute);



app.get("/", (req, res) => {
    try {
        res.send("Welcome to Readify Service Server !");
    } catch (error) {
        console.log(error.message);
    };
});

app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.red.bold);
    } catch (error) {
        console.log(error.message);
    };
});

exports = app;