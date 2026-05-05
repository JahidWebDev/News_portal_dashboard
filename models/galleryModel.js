const mongoose = require("mongoose");

const { Schema } = mongoose;

const gallery_schema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gallery", gallery_schema);