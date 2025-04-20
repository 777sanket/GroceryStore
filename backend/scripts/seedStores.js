const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Store = require("../models/Store");

const stores = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../..", "backend", "data", "stores.json"),
    "utf-8"
  )
);

const seedStores = async () => {
  await connectDB();
  await Store.deleteMany({});
  await Store.insertMany(stores);
  console.log(`✅ Seeded ${stores.length} stores`);
  process.exit(0);
};

seedStores();
