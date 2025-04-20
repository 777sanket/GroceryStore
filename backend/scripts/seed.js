const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");

dotenv.config();

const Store = require("../models/Store");
const Product = require("../models/Product");
const Order = require("../models/Order");

connectDB();

const stores = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../..", "data", "stores.json"), "utf-8")
);

const products = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../..", "data", "products.json"),
    "utf-8"
  )
);

const orders = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../..", "data", "orders.json"), "utf-8")
);

const seedData = async () => {
  try {
    await Store.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log("Data cleared from database");

    const formattedStores = stores.map((store) => {
      return {
        // _id: new mongoose.Types.ObjectId(store._id.$oid),
        _id: store._id
          ? new mongoose.Types.ObjectId(store._id.$oid)
          : undefined,
        name: store.name,
        location: store.location,
      };
    });

    const formattedProducts = products.map((product) => {
      return {
        _id: new mongoose.Types.ObjectId(product._id.$oid),
        name: product.name,
        price: product.price,
        storeId: new mongoose.Types.ObjectId(product.storeId.$oid),
        quantity: product.quantity,
      };
    });

    const formattedOrders = orders.map((order) => {
      return {
        _id: new mongoose.Types.ObjectId(order._id.$oid),
        customerName: order.customerName,
        items: order.items.map((item) => ({
          productId: new mongoose.Types.ObjectId(item.productId.$oid),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        storeId: new mongoose.Types.ObjectId(order.storeId.$oid),
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: new Date(order.createdAt.$date),
      };
    });

    await Store.insertMany(formattedStores);
    console.log(`${formattedStores.length} stores inserted`);

    await Product.insertMany(formattedProducts);
    console.log(`${formattedProducts.length} products inserted`);

    await Order.insertMany(formattedOrders);
    console.log(`${formattedOrders.length} orders inserted`);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
