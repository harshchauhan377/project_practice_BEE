const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

require("dotenv").config()


const userRegister = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, age, bloodGroup, gender, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !age || !bloodGroup || !gender || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User  Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        firstName,
        lastName,
        age,
        bloodGroup,
        gender,
        phoneNumber,
        password: hashedPassword
    });

    // Generate a token after registration
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: '30d' });

    res.status(201).json({ message: "User  Registered Successfully", user, token });
});


const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt for email:", email); // Debugging log

    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        console.log(`User not found for email: ${email}`);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log(`Invalid password for email: ${email}`);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    try {
        if (!process.env.PRIVATE_KEY) {
            console.error("JWT private key is not configured");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: '30d' });
        console.log("User logged in successfully:", user.email);
        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        console.error("Token generation error:", error);
        return res.status(500).json({ message: "Token generation failed" });
    }
});



const userProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User Not Found");
    }
    
    return res.status(200).json({ message: "User Profile", user });
});


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const { firstName, email, phoneNumber, password } = req.body;

    if (!user) {
        res.status(404);
        throw new Error("User Not Found");
    }

    if (firstName) user.firstName = firstName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.save();

    return res.status(200).json({message: "Profile Updated Successfully",user: updatedUser})
   
})



module.exports = { userRegister, userLogin, userProfile, updateUserProfile }