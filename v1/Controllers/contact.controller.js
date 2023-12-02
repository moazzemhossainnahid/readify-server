const express = require("express");
const Contacts = require('../Models/contact.model');
require('dotenv').config();



// add a Contact
exports.saveAContact = async (req, res) => {
    try {
        const contact = req.body;

        const contacts = await Contacts.create(contact);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: contacts
        });
    } catch (error) {
        res.json(error);
    }
};


// get single contact
exports.getSingleContact = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const contact = await Contacts.findOne(query);
        return res.status(200).json(contact);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all contact
exports.getAllContacts = async (req, res) => {
    try {
        const query = {};

        const result = await Contacts.find(query);

        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a contact
exports.deleteAContact = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Contacts.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}



