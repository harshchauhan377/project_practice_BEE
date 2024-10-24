const asyncHandler = require("express-asyns-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,phonenumber} = req.body;

    //check if all fields are provided
    if(!name || !email || !password || !phonenumber){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    //check if user already exists
    const userExists = await user.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User already exists"});
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const user = await User.create({
        email,
        firstName,
        lastName,
        age,
        bloodGroup,
        gender,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({message:"User registered successfully",user});

});