const moment = require("moment");
const News = require("../models/newsModel");
const slugify = require("slugify");

class newsController {
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
       description: description,
        category,
        date: moment().format("LL"),
          image: image,
        titleWords, // optional (if you want store words)
      });

      console.log("NEWS CREATED:", {
        id: news._id,
        title: news.title,
        image: news.image,
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
}

module.exports = new newsController();
