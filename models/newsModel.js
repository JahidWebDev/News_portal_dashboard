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
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // ✅ FIXED: support single OR multiple image future-safe
    image: {
      type: [String], // 🔥 better than String
      default: [],
    },

    category: {
      type: String,
      default: "all",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("News", newsSchema);