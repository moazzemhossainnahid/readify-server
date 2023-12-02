const express = require("express");
const Books = require('../Models/books.model');
require('dotenv').config();



// add a Book
exports.addABook = async (req, res) => {
    try {
        const book = req.body;
        // console.log(req.file);
        // console.log(req.body);
        const books = await Books.create(book);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: books
        });
    } catch (error) {
        res.json(error);
    }
}


// get single Book
exports.getSingleBook = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const book = await Books.findOne(query);
        return res.status(200).json(book);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all Books
exports.getAllBooks = async (req, res) => {
    try {
        let filters = { ...req.query };

        // sort - page - limit => exclude
        const excludesFields = ['sort', 'page', 'limit'];
        excludesFields.forEach(field => delete filters[field]);

        // gt, lt, gte, lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // parsing algorithm
        filters = JSON.parse(filterString);

        // limit, sort, select ->  Are store Here    
        const queries = {};

        //  queries by sort anything

        if (req.query.sort) {
            // price, quantity => 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };


        // queries by limit of data

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        };

        // queries by limit

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = (limit * 1);
        };


        // Pagination

        if (req.query.page) {

            const { page = 1, limit = 6 } = req.query;   //'2' '5'

            queries.limit = limit;

            const skip = (page - 1) * parseInt(limit);

            queries.skip = skip
            queries.limit = parseInt(limit)
        };


        const result = await Books.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .sort(queries.sortBy)
            .select(queries.fields)
            ;


        const totalBooks = await Books.countDocuments(filters);
        const pageCount = Math.ceil(totalBooks / queries.limit);


        // if not data
        if (Books.length === 0) {
            return res.status(200).json({
                message: "You've no Data or Entered a Wrong Queries. Please insert first then Find data or check your Queries",
            });
        };


        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { totalBooks, pageCount, result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a Book
exports.deleteABook = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Books.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}

