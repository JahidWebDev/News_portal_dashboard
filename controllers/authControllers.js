const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class authController {
  login = async (req, res) => {
    const { email, password } = req.body;

    console.log("==== LOGIN DEBUG ====");
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    try {
      const user = await User.findOne({ email });
      console.log("User:", user);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials"
        });
      }

      // ✅ JWT TOKEN CREATE
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
console.log("JWT SECRET:", process.env.JWT_SECRET);
console.log("TOKEN:", token);
      res.status(200).json({
        message: "Login successful!",
        token, // ✅ send token to frontend
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          category: user.category,
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error"
      });
    }
  };
}

module.exports = new authController();