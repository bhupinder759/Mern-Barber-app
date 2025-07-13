const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  const token = req.cookies.token; // token from cookie

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id & role available in req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' is not allowed to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
