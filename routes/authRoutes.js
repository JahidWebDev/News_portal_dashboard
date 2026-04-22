const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const middlewares = require("../middlewares/middlewares");

// LOGIN
router.post("/login", authController.login);

// ADD WRITER (ADMIN ONLY)
router.post(
  "/writer/add",
  middlewares.auth,
  middlewares.role,
  authController.add_writer
);

// GET WRITERS (ADMIN ONLY)
router.get(
  "/writers",
  middlewares.auth,
  middlewares.role,
  authController.get_writers
);

module.exports = router;