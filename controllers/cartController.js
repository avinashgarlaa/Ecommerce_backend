const pool = require("../config/db");

// ✅ ADD TO CART
exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    if (!product_id || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await pool.query(
      "INSERT INTO cart(product_id, quantity) VALUES($1,$2)",
      [product_id, quantity]
    );

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ GET CART
exports.getCart = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cart.id, products.name, products.price, products.image_url, cart.quantity
      FROM cart
      JOIN products ON cart.product_id = products.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    await pool.query("DELETE FROM cart WHERE id=$1", [req.params.id]);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    console.error("Error removing item:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};