const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productController");

const {protect,admin} = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected (IMPORTANT)
router.post("/", protect, admin, upload.single("image"), createProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

module.exports = router;