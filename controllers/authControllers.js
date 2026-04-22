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
      const user = await User.findOne({ email });

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
      return res.status(500).json({ message: "Server error" });
    }
  };

  // ADD WRITER (IMPORTANT FIX)
  add_writer = async (req, res) => {
    try {
     

      const { name, email, password, category } = req.body;
         console.log("BODY:", req.body);
      if (!name || !email || !password || !category) {
        return res.status(400).json({ message: "All fields required" });
      }

      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newWriter = await User.create({
        name,
        email,
        password: hashPassword,
        category,
        role: "writer"
      });

      return res.status(201).json({
        message: "Writer created successfully",
        writer: newWriter
      });

    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };

}

module.exports = new AuthController();