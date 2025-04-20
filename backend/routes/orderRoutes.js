const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.post("/", OrderController.createOrder);
router.get("/:id", OrderController.getOrderById);

module.exports = router;
