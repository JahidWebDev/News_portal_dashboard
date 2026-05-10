const moment = require("moment");
const News = require("../models/newsModel");
const slugify = require("slugify");
const galleryModel = require("../models/galleryModel");
const { ObjectId } = require("mongodb");
const cloudinary = require("../config/cloudinary");
const newsModel = require("../models/newsModel");
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
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imagesData = req.files.map((file) => ({
      writerId: new ObjectId(req.user.id),
      image: file.path,
      public_id: file.filename,
    }));

    const savedImages = await galleryModel.insertMany(imagesData);

    return res.status(201).json({
      message: "Images uploaded successfully",
      images: savedImages,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
}



get_dashboard_news = async (req, res) => {
  try {
    const { id, role } = req.user;

    let news = [];

    if (role === "admin") {
      news = await newsModel.find({}).sort({ createdAt: -1 });
    } else {
      news = await newsModel
        .find({ writerId: new ObjectId(id) })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
};


get_dashboard_single_news = async (req, res) => {
  const { id } = req.params;

  console.log("NEWS ID:", id);

  try {
    const news = await newsModel.findById(id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    return res.status(200).json({
      news,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



}

module.exports = new newsController();