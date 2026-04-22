const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/login", authController.login);

// 🔥 THIS MUST MATCH FRONTEND
router.post("/writer/add", authController.add_writer);

module.exports = router;