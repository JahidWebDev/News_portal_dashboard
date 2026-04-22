const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

  // LOGIN
  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    try {
      const cleanEmail = email.trim().toLowerCase();

      const user = await User.findOne({ email: cleanEmail });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          category: user.category,
        },
      });

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };


  // ADD WRITER
  add_writer = async (req, res) => {
    try {
      console.log("BODY:", req.body);

      const { name, email, password, category } = req.body;

      if (!name || !email || !password || !category) {
        return res.status(400).json({ message: "All fields required" });
      }

      const cleanEmail = email.trim().toLowerCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({ message: "Invalid email" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      const existing = await User.findOne({ email: cleanEmail });

      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newWriter = await User.create({
        name,
        email: cleanEmail,
        password: hashPassword,
        category,
        role: "writer"
      });

      const { password: _, ...writerWithoutPassword } = newWriter.toObject();

      return res.status(201).json({
        message: "Writer created successfully",
        writer: writerWithoutPassword
      });

    } catch (error) {
      console.error("ADD WRITER ERROR:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };


  // GET WRITERS (FIXED)
get_writers = async (req, res) => {
  try {
    const writers = await User.find({
      role: "writer"
    }).select("-password");

    return res.status(200).json({
      success: true,
      total: writers.length,
      writers: writers || []
    });

  } catch (error) {
    console.error("GET WRITERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

}

module.exports = new AuthController();