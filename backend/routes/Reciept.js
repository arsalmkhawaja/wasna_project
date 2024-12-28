const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/Reciept");
const authenticationMiddleware = require("../middleware/auth");

// Routes for receipts (protected by authentication middleware)
router.post("/", authenticationMiddleware, receiptController.createReceipt);
router.get("/", authenticationMiddleware, receiptController.getAllReceipts);
router.get("/:id", authenticationMiddleware, receiptController.getReceiptById);
router.put("/:id", authenticationMiddleware, receiptController.updateReceipt);
router.delete("/:id", authenticationMiddleware, receiptController.deleteReceipt);

module.exports = router;
