const jwt = require("jsonwebtoken");

/**
 * Middleware: Verify JWT token from Authorization header.
 * Attaches decoded admin payload to req.admin.
 */
module.exports = function authMiddleware(req, res, next) {
  const header = req.headers["authorization"] || "";
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

