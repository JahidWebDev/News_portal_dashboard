const jwt = require("jsonwebtoken");

class middleware {

  auth = (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // 🔥 REQUIRED

      next();

    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };

  role = (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
      }

      next();

    } catch (error) {
      return res.status(500).json({ message: "Role check error" });
    }
  };

}

module.exports = new middleware();