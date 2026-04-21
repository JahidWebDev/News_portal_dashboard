// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Define login route
router.post('/api/login', authController.login);

module.exports = router;