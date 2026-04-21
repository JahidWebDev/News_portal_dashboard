const User = require('../models/authModel');
const bcrypt = require('bcryptjs');

class authController {
  login = async (req, res) => {
    const { email, password } = req.body;
      console.log(password, "email");
      

console.log("==== LOGIN DEBUG ====");
console.log("Raw Body:", req.body);
console.log("Email:", `"${email}"`);
console.log("Password:", `"${password}"`);
console.log("Email length:", email?.length);
console.log("====================");

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    try {
      const user = await User.findOne({ email });
      console.log("User:", user);

      // ✅ FIX: return added
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

      res.status(200).json({
        message: "Login successful!",
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        category: user.category,
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