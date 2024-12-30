const Receipt = require("../models/Reciept");
const User = require("../models/User");

// Create a new receipt
exports.createReceipt = async (req, res) => {
  try {
    const { eventType, subEvents, menus, decor, photographyPackages, menuRemarks, decorRemarks, photographyRemarks, additionalRemarks, totalPrice } = req.body;

    const user = req.user; // User is added to the request by auth middleware

    const newReceipt = new Receipt({
      user: user._id,
      eventType,
      subEvents,
      menus,
      decor,
      photographyPackages,
      menuRemarks,
      decorRemarks,
      photographyRemarks,
      additionalRemarks,
      totalPrice,
    });

    await newReceipt.save();
    res.status(201).json({ message: "Receipt created successfully", receipt: newReceipt });
  } catch (error) {
    res.status(500).json({ message: "Failed to create receipt", error: error.message });
  }
};

// Fetch all receipts for a user
exports.getUserReceipts = async (req, res) => {
  try {
    const user = req.user; // User is added to the request by auth middleware

    const receipts = await Receipt.find({ user: user._id }).populate("user", "fullName phoneNumber");
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch receipts", error: error.message });
  }
};