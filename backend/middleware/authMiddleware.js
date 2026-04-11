// Import jsonwebtoken library for handling JWT token verification
const jwt = require("jsonwebtoken");

// Import the User model to fetch user details from the database
const User = require("../models/User");

// Middleware function to protect routes by verifying JWT tokens
// This ensures only authenticated users can access certain endpoints
exports.protect = async (req, res, next) => {
  // Extract the JWT token from the Authorization header
  // Expected format: "Bearer <token>", so split and take the second part
  let token = req.headers.authorization?.split(" ")[1];

  // If no token is provided in the header, return an unauthorized error
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify the token using the secret key from environment variables
    // This decodes the token and extracts the payload (e.g., user ID)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the ID from the decoded token
    // Exclude the password field from the result for security
    req.user = await User.findById(decoded.id).select("-password");

    // If verification succeeds, proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If token verification fails (e.g., expired, invalid, or tampered), return an error
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
