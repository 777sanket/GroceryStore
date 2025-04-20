const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");

dotenv.config();

const Product = require("../models/Product");

connectDB();

const products = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../..", "backend", "data", "products.json"),
    "utf-8"
  )
);

const seedProducts = async () => {
  try {
    await Product.deleteMany({});

    console.log("Products data cleared from database");

    const formattedProducts = products.map((product) => {
      return {
        name: product.name,
        price: product.price,

        storeId: product.storeId.$oid,
        quantity: product.quantity,
      };
    });

    await Product.insertMany(formattedProducts);
    console.log(`${formattedProducts.length} products inserted`);

    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
