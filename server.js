require("dotenv").config();
const express = require('express');
const cors = require('cors');
const db_connect = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require("./routes/newsRoutes"); 
db_connect();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes FIXED
app.use('/api', authRoutes);
app.use("/api/news", newsRoutes);
app.use("/uploads", express.static("upload"));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});