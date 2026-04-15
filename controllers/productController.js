const pool = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

// ✅ GET ALL PRODUCTS
exports.getProducts = asyncHandler(async (req, res) => {
  const { q, category, sort } = req.query;
  const conditions = [];
  const values = [];
  let orderByClause = "ORDER BY id DESC";

  if (q) {
    values.push(`%${q}%`);
    conditions.push(`(name ILIKE $${values.length} OR description ILIKE $${values.length})`);
  }

  if (category && category !== "All") {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }

  if (sort === "price_asc") {
    orderByClause = "ORDER BY price ASC";
  } else if (sort === "price_desc") {
    orderByClause = "ORDER BY price DESC";
  } else if (sort === "newest") {
    orderByClause = "ORDER BY id DESC";
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const query = `SELECT * FROM products ${whereClause} ${orderByClause}`;
  const result = await pool.query(query, values);
  return successResponse(res, result.rows, "Products fetched");
});

// ✅ GET PRODUCT BY ID
exports.getProductById = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return successResponse(res, result.rows[0], "Product fetched");
});