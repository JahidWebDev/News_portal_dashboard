// server.js
require("dotenv").config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db_connect = require('./utils/db');
const authRoutes = require('./routes/authRoutes');  // Import auth routes

db_connect(); 
dotenv.config();
 // Connect to database

const app = express();

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors());  // Enable CORS

// Register authRoutes
app.use('/', authRoutes);  // This registers routes under '/' (root path)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});