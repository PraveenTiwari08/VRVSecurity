const jwt = require("jsonwebtoken");

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Corrected "authorization"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

// Middleware to authorize based on roles
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};

module.exports = { protect, authorize };
