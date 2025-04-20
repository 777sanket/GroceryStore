const express = require("express");
const router = express.Router();
const StoreController = require("../controllers/storeController");

router.get("/", StoreController.getStores);
router.get("/:id", StoreController.getStoreById);

module.exports = router;
