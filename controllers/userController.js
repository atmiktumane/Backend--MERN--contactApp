const asyncHandler = require("express-async-handler");

//@desc Register the User
//route POST "/api/users/register"
//access Public
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register the user" });
});

//@desc login User
//route POST "/api/users/login"
//access Public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login user" });
});

//@desc current User info
//route GET "/api/users/current"
//access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user info" });
});

module.exports = { registerUser, loginUser, currentUser };