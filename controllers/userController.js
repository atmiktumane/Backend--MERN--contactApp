const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//@desc Register the User
//route POST "/api/users/register"
//access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Simple Validation
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All the fields are mandatory");
    }

    // Check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists!");
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password : ", hashedPassword);

    // Create/register new user and save it in MongoDb database
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`New User created & stored in Database : ${newUser}`);


    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }


    // res.json({ message: "Register the user" });
});

//@desc login User
//route POST "/api/users/login"
//access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Simple Validation
    if (!email || !password) {
        res.status(400);
        throw new Error("All the fields are mandatory");
    }

    // Check if User exists in database
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User does not exist");
    }

    // Check Password : Compare req.password with HashedPassword present in database
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
        res.status(400);
        throw new Error("Invalid Credentials");
    }

    // Create JWT Payload
    const jwtPayload = {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };

    // Sign JWT Token : Generate Token
    const accessToken = jwt.sign(
        jwtPayload,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "20m" }, // Token expires in 20 minutes
    );

    res.status(201).json({ "Acess Token": accessToken });
});

//@desc current User info
//route GET "/api/users/current"
//access Private
const currentUser = asyncHandler(async (req, res) => {

    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };