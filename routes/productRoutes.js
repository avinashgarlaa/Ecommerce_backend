const express = require("express");
const router = express.Router();

const { getProducts, getProductById } = require("../controllers/productController");
const {
  validateProductQuery,
  validateNumericId,
} = require("../middleware/validateMiddleware");

router.get("/", validateProductQuery, getProducts);
router.get("/:id", validateNumericId("id"), getProductById);

module.exports = router;