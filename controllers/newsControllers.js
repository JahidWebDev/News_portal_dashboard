const moment = require("moment");
const News = require("../models/newsModel");
const slugify = require("slugify");
const galleryModel = require("../models/galleryModel");
const { ObjectId } = require("mongodb");

class newsController {
  // ✅ ADD NEWS
  async add_news(req, res) {
    try {
      const { id, name } = req.user;
      const { title, description, category } = req.body;

      if (!title || !description || !category) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      const slug = slugify(title, { lower: true, strict: true });

      const image = req.file.path;
      const cleanTitle = title.trim();
      const titleWords = cleanTitle.split(" ");

      const news = await News.create({
        writerId: id,
        writerName: name,
        title: cleanTitle,
        slug,
        description,
        category,
        date: moment().format("LL"),
        image,
        titleWords,
      });

      res.status(201).json({
        success: true,
        message: "News added successfully",
        news,
      });
    } catch (error) {
      console.log("ERROR:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ✅ GET IMAGES
  async get_images(req, res) {
    try {
      const { id } = req.user;

      const images = await galleryModel
        .find({ writerId: new ObjectId(id) })
        .sort({ createdAt: -1 });

      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

async add_images(req, res) {
  try {
    const { id } = req.user;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const imagesData = req.files.map((file) => ({
      writerId: id,
      image: `http://localhost:5000/uploads/${file.filename}`, // ✅ FULL URL
      public_id: file.filename,
    }));

    const savedImages = await galleryModel.insertMany(imagesData);

    return res.status(201).json({
      message: "Images uploaded successfully",
      images: savedImages,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Image upload failed",
    });
  }
}
}

module.exports = new newsController();