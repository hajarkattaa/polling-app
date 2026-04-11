const mongoose = require("mongoose");

// Function to connect to the MongoDB database using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
//similar to above but with .then and .catch instead of async/await
// const connectDB = async () => mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   });

module.exports = connectDB;

// Start server
// ↓
// connectDB()
// ↓
// Connect to MongoDB
// ↓
// If success → continue
// If fail → stop app
