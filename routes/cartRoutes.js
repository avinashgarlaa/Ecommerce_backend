const express = require("express");
const router = express.Router();

const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);

module.exports = router;