const mongoose = require("mongoose");
const { Schema } = mongoose;

const gallerySchema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ IMPORTANT FIX (correct model name)
module.exports = mongoose.model("Gallery", gallerySchema);