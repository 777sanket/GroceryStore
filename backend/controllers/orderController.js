const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { customerName, items, storeId, totalAmount } = req.body;

    if (
      !customerName ||
      !items ||
      items.length === 0 ||
      !storeId ||
      !totalAmount
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newOrder = new Order({
      customerName,
      items,
      storeId,
      totalAmount,
      status: "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
