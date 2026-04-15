exports.validateProductQuery = (req, res, next) => {
  const { sort } = req.query;
  const allowedSort = ["newest", "price_asc", "price_desc"];

  if (sort && !allowedSort.includes(sort)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sort value",
    });
  }

  next();
};

exports.validateNumericId = (paramName = "id") => (req, res, next) => {
  const value = Number(req.params[paramName]);
  if (!Number.isInteger(value) || value < 1) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${paramName}`,
    });
  }
  next();
};
