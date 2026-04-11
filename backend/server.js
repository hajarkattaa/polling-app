// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import Express for building the server and CORS for handling cross-origin requests
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // Import authentication routes
// Import the function to connect to the MongoDB database
const connectDB = require("./config/db");
// Create a new Express application instance
const app = express();

// Configure middleware to enable CORS for allowed origins, methods, and headers
app.use(
  cors({
    // Allow requests from the client URL defined in env, or allow all origins as a fallback
    origin: process.env.ClIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse incoming JSON request bodies automatically
app.use(express.json());

// Connect to the MongoDB database before starting the server
connectDB();

app.use("/api/v1/auth", authRoutes); // Use the auth routes for handling authentication-related endpoints
// Use the PORT from env if available, otherwise default to 5000
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the Polling App API");
});

// Start the server and listen for incoming requests on the configured port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Incoming request
// → passes through filters (middleware)
// → reaches handler (route)
// → returns result
