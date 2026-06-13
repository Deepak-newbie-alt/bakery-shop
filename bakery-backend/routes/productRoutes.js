const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  deleteProduct
} = require("../controllers/productController");

const {protect,admin} = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public
router.get("/", getProducts);

// Protected (IMPORTANT)
router.post("/", protect, admin, upload.single("image"), createProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;