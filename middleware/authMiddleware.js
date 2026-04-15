const { verifyToken } = require("../utils/authToken");

exports.requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = { id: payload.id, email: payload.email };
  next();
};
