// Import Mongoose for MongoDB object modeling and schema definition
const mongoose = require("mongoose");

// Import bcrypt for hashing passwords securely
const bcrypt = require("bcryptjs");

// Define the User schema to structure user data in the database
// This schema outlines the fields for user documents, including validation rules
const userSchema = new mongoose.Schema(
  {
    // Username: A unique identifier for the user, required for login and display
    username: { type: String, required: true },

    // Full name: The complete name of the user, required for personalization
    fullname: { type: String, required: true },

    // Email: Must be unique across all users, used for authentication and notifications
    email: { type: String, required: true, unique: true },

    // Password: Stored as a hashed string for security, required for account creation
    password: { type: String, required: true },

    // Profile image URL: Optional field to store the URL of the user's profile picture
    profileImageUrl: { type: String, default: null },

    // Bookmarked polls: An array of ObjectIds referencing Poll documents the user has bookmarked
    // Uses Mongoose population for easy retrieval of related poll data
    bookmarkedPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
  },

  // Enable automatic timestamps (createdAt and updatedAt) for tracking document changes
  { timestamps: true },
);

// Pre-save middleware: Automatically hash the password before saving a new or updated user document
// This ensures passwords are never stored in plain text for security
userSchema.pre("save", async function (next) {
  // Skip hashing if the password field hasn't been modified (e.g., during updates to other fields)
  if (!this.isModified("password")) return next();

  // Hash the password with a salt rounds of 10 for strong security
  this.password = await bcrypt.hash(this.password, 10);

  // Proceed to save the document
  next();
});

// Instance method: Compare a provided password with the stored hashed password
// Used during login to verify user credentials without exposing the hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Use bcrypt to compare the candidate password with the stored hash
  // Returns true if they match, false otherwise
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model, which can be used to interact with the 'users' collection in MongoDB
// This model provides methods for creating, reading, updating, and deleting user documents
module.exports = mongoose.model("User", userSchema);
