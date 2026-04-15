const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCart);
router.patch("/:id", updateCartQuantity);
router.delete("/:id", removeFromCart);

module.exports = router;