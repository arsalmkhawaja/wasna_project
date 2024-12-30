const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/Reciept");
const authenticationMiddleware = require("../middleware/auth");

// Routes for receipts (protected by authentication middleware)
router.post("/", authenticationMiddleware, receiptController.createReceipt);
router.get("/", authenticationMiddleware, receiptController.getUserReceipts);


module.exports = router;
