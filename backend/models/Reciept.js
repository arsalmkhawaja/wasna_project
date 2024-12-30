const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User", // Refers to the User collection
    required: true,
  },
  eventType: { type: String, required: true },
  subEvents: { type: [String], required: true },
  menus: { type: [String], required: true },
  decor: { type: String },
  photographyPackages: { type: [String] },
  menuRemarks: { type: String },
  decorRemarks: { type: String },
  photographyRemarks: { type: String },
  additionalRemarks: { type: String },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;