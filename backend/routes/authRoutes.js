const express = require("express");
const { registerUser } = require("../controllers/authController"); // Import the registerUser function from the authController
const router = express.Router(); // Create a new Express router instance

// Define the route for user registration
// This route will handle POST requests to /api/auth/register
router.post("/register", registerUser); // When a POST request is made to /register, the registerUser function will be called

module.exports = router; // Export the router to be used in the main application file (e.g., app.js)
