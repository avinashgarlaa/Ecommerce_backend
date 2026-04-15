exports.notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error";
  const details = process.env.NODE_ENV === "development" ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};
