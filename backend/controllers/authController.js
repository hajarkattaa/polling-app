// Import required dependencies
const User = require("../models/User"); // MongoDB User model for database operations
const jwt = require("jsonwebtoken"); // Library for creating and verifying JWT tokens
const bcrypt = require("bcryptjs"); // Library for hashing and comparing passwords

const generateToken = (id) => {
  return jwt.sign(
    { id }, // Payload containing the user ID
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: "1h" }, // Token expires after 1 hour
  );
};

//Register User
exports.registerUser = async (req, res) => {
  // Extract user input from request body
  const { fullName, username, email, password, prof } = req.body;

  // ===== INPUT VALIDATION =====
  // Check if all required fields are provided
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Validate username format: only allow alphanumeric characters and hyphens
  // This prevents special characters that could cause security issues
  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: "Username can only contain letters, numbers, and hyphens",
    });
  }

  try {
    // ===== DUPLICATE CHECKING =====
    // Check if email already exists in database to prevent duplicate accounts
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if username is already taken
    // Usernames must be unique for user identification
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // ===== USER CREATION =====
    // Create new user document in database with provided information
    // Password is hashed automatically by the User model's pre-save middleware
    const user = await User.create({
      fullName, // User's full name
      username, // Unique username for login/identification
      email, // User's email address
      password, // Password (will be encrypted before saving to DB)
      profileImageUrl, // URL to user's profile picture
    });

    // ===== SUCCESSFUL RESPONSE =====
    // Return 201 (Created) status with user info and authentication token
    res.status(201).json({
      _id: user._id, // User's unique database ID
      user, // Full user object
      token: generateToken(user._id), // JWT token for immediate authentication
    });
  } catch (error) {
    // ===== ERROR HANDLING =====
    // Catch any unexpected errors during registration process
    res.status(500).json({
      message: "Error registering user, error: err.message",
    });
  }
};
