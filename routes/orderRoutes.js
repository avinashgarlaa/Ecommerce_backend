const express = require("express");
const router = express.Router();

const { placeOrder } = require("../controllers/orderController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/", requireAuth, placeOrder);

module.exports = router;