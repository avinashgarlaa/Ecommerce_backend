const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} = require("../controllers/cartController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/", requireAuth, addToCart);
router.get("/", requireAuth, getCart);
router.patch("/:id", requireAuth, updateCartQuantity);
router.delete("/:id", requireAuth, removeFromCart);

module.exports = router;