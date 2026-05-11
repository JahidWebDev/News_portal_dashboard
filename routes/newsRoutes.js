const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares/middlewares");
const newsControllers = require("../controllers/newsControllers");
const upload = require("../middlewares/upload");

// ================= ADD NEWS =================
router.post(
  "/add",
  middlewares.auth,
  upload.single("image"),
  newsControllers.add_news
);
// ================= UPDATE NEWS =================
router.put(
  "/:id",
  middlewares.auth,
  upload.single("image"),
  newsControllers.update_news
);

// ================= IMAGES =================
router.get(
  "/images",
  middlewares.auth,
  newsControllers.get_images
);

router.post(
  "/images/add",
  middlewares.auth,
  upload.array("images"),
  newsControllers.add_images
);

// ================= DASHBOARD NEWS =================
router.get(
  "/dashboard/news",
  middlewares.auth,
  newsControllers.get_dashboard_news
);

// ================= SINGLE NEWS =================
router.get(
  "/dashboard/news/:id",
  middlewares.auth,
  newsControllers.get_dashboard_single_news
);

module.exports = router;