const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User', // Refers to the User collection
      required: true,
    },
    events: {
      type: Number,
      required: true,
    },
    eventTypes: {
      type: [String], // Array of event types
      required: true,
    },
    menus: {
      type: [String], // Array of menu items
      required: true,
    },
    photographyPackages: {
      type: [String], // Array of photography packages
      default: [], // Default is an empty array
    },
    decor: {
      type: Boolean, // Indicates if decor is included
      default: false,
    },
    additionalCharges: {
      type: Number, // Additional charges amount
      default: 0,
    },
    additionalRemarks: {
      type: String, // Any additional remarks
      trim: true,
      default: '', // Default is an empty string
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Receipt', receiptSchema);
