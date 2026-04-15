const pool = require("../config/db");

// ✅ GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
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
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};