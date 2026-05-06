const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "news_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

// IMPORTANT: no fileFilter (avoids 500 issues)

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

module.exports = upload;