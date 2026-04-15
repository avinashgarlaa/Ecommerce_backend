const pool = require("../config/db");

// ✅ ADD TO CART
exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    if (!product_id || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await pool.query("SELECT id, quantity FROM cart WHERE product_id = $1", [product_id]);

    if (existing.rows.length > 0) {
      await pool.query("UPDATE cart SET quantity = quantity + $1 WHERE id = $2", [
        quantity,
        existing.rows[0].id,
      ]);
    } else {
      await pool.query("INSERT INTO cart(product_id, quantity) VALUES($1,$2)", [product_id, quantity]);
    }

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

// ✅ UPDATE CART QUANTITY
exports.updateCartQuantity = async (req, res) => {
  const { quantity } = req.body;

  try {
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const result = await pool.query("UPDATE cart SET quantity=$1 WHERE id=$2 RETURNING id", [
      quantity,
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart quantity updated" });
  } catch (err) {
    console.error("Error updating quantity:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};