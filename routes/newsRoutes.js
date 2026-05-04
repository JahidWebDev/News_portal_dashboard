const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares/middlewares");
const newsControllers = require("../controllers/newsControllers");
const upload = require("../middlewares/upload");


// ✅ IMPORTANT ROUTE
router.post(
  "/add",
  middlewares.auth,
  upload.single("image"),
  newsControllers.add_news
);
router.get(
  "/images",
  middlewares.auth,
 newsControllers.get_images
 
);

module.exports = router;