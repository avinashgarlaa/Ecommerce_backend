const pool = require("../config/db");

// ✅ PLACE ORDER
exports.placeOrder = async (req, res) => {
  const { address, paymentMethod } = req.body;
  const userId = req.user.id;

  try {
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const normalizedAddress =
      typeof address === "string" ? { fullAddress: address } : address;

    // 1. Get cart items
    const cartItems = await pool.query("SELECT * FROM cart WHERE user_id = $1", [userId]);

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    // 2. Calculate total
    for (let item of cartItems.rows) {
      const product = await pool.query(
        "SELECT price FROM products WHERE id=$1",
        [item.product_id]
      );

      total += product.rows[0].price * item.quantity;
    }

    // 3. Create order
    const order = await pool.query(
      "INSERT INTO orders(user_id, address, total_amount, payment_method, status) VALUES($1,$2,$3,$4,$5) RETURNING id",
      [userId, normalizedAddress, total, paymentMethod || "COD", "PLACED"]
    );

    const orderId = order.rows[0].id;

    // 4. Insert order items
    for (let item of cartItems.rows) {
      const product = await pool.query(
        "SELECT price FROM products WHERE id=$1",
        [item.product_id]
      );
      await pool.query(
        "INSERT INTO order_items(order_id, product_id, quantity, price_at_purchase) VALUES($1,$2,$3,$4)",
        [orderId, item.product_id, item.quantity, product.rows[0].price]
      );
    }

    // 5. Clear cart
    await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);

    res.json({
      message: "Order placed successfully",
      orderId,
    });

  } catch (err) {
    console.error("Error placing order:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};