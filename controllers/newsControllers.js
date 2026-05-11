const moment = require("moment");
const News = require("../models/newsModel");
const slugify = require("slugify");
const galleryModel = require("../models/galleryModel");
const { ObjectId } = require("mongodb");
const cloudinary = require("../config/cloudinary");
const newsModel = require("../models/newsModel");
class newsController {
// controller
async update_news(req, res) {
  try {

    const { id } = req.params;
    const { title, description, category } = req.body;

    // ✅ check news exists
    const existingNews = await newsModel.findById(id);

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // ✅ FIX: safe image handling (NO CRASH)
    if (req.file && existingNews.image) {
      try {
        let imageUrl = existingNews.image;

        // handle array or string both
        if (Array.isArray(imageUrl)) {
          imageUrl = imageUrl[0];
        }

        if (typeof imageUrl === "string") {
          const publicId = imageUrl.split("/").pop().split(".")[0];

          await cloudinary.uploader.destroy(publicId);
        }

      } catch (err) {
        console.log("Cloudinary delete error:", err.message);
      }
    }

    // ✅ update payload
    const updateData = {
      title,
      description,
      category,
      slug: slugify(title, {
        lower: true,
        strict: true,
      }),
    };

    // ✅ replace image
    if (req.file) {
      updateData.image = req.file.path;
    }

    const news = await newsModel.findByIdAndUpdate(
      id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
  
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