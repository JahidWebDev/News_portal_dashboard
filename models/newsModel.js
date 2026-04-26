const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    writerName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true, // ✅ important
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "all",
    },

    date: {
      type: Date, // ✅ FIXED
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // ✅ better control
      default: "pending", // ✅ fixed spelling
    },

    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("News", newsSchema);