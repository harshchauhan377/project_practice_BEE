const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorDetailsModel");

// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
    const { email, name, speciality, phoneNumber, experience, address } = req.body;

    // Check if doctor already exists
    const docExists = await Doctor.findOne({ email });
    if (docExists) {
        return res.status(400).json({ message: "Doctor already exists" });
    }

    // Create a new doctor
    const doc = await Doctor.create({
        email,
        name,
        speciality,
        phoneNumber,
        experience,
        address
    });

    res.status(201).json(doc); // Send a response back to the client
});

// Get all doctors
const gettingdocs = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find(); // Retrieve all doctors
    res.status(200).json(doctors); // Send the list of doctors as a response
});

// Export the functions
module.exports = { registerDoctor, gettingdocs };