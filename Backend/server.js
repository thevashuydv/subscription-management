const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Dbconnection/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define routes (for example, a basic route)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Get the port from the environment variables or use 5000 by default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});