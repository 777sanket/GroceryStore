const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.get("/store/:storeId", ProductController.getProductsByStore);
router.put("/:id", ProductController.updateProduct);

module.exports = router;
