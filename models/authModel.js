const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  image: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
    default: "all",
  },
}, { timestamps: true });

module.exports = model("User", authSchema);