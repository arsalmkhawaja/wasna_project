const Receipt = require("../models/Reciept");

// Create a new receipt
exports.createReceipt = async (req, res) => {
  try {
    const { photographyPackages, additionalRemarks, ...rest } = req.body;

    // Use authenticated user's ID (assume authentication middleware adds req.user)
    const userId = req.user.id;

    const receipt = new Receipt({
      user: userId, // Associate receipt with the logged-in user
      ...rest,
      photographyPackages: photographyPackages || [], // Default to empty array
      additionalRemarks: additionalRemarks || "", // Default to empty string
    });

    const savedReceipt = await receipt.save();
    res.status(201).json(savedReceipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all receipts (with user details)
exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find()
      .populate("user", "fullName phoneNumber") // Populate user details
      .exec();
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single receipt by ID (with user details)
exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate("user", "fullName phoneNumber") // Populate user details
      .exec();
    if (!receipt) return res.status(404).json({ error: "Receipt not found" });
    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a receipt
exports.updateReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) return res.status(404).json({ error: "Receipt not found" });

    // Ensure the receipt belongs to the logged-in user
    if (receipt.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this receipt" });
    }

    // Update the receipt
    Object.assign(receipt, req.body);
    const updatedReceipt = await receipt.save();

    res.status(200).json(updatedReceipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) return res.status(404).json({ error: "Receipt not found" });

    // Ensure the receipt belongs to the logged-in user
    if (receipt.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this receipt" });
    }

    await receipt.remove();
    res.status(200).json({ message: "Receipt deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
