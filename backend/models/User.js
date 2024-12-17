// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please add a valid phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Exclude from queries by default
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true,
    },
    paymentDetails: {
      cardNumber: {
        type: String,
        required: [true, 'Please add a card number'],
        // Consider encrypting sensitive payment details
      },
      cardHolderName: {
        type: String,
        required: [true, 'Please add the card holder name'],
        trim: true,
      },
      expiryDate: {
        type: String,
        required: [true, 'Please add the card expiry date'],
        match: [/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Please add a valid expiry date (MM/YY)'],
      },
      cvv: {
        type: String,
        required: [true, 'Please add the card CVV'],
        match: [/^[0-9]{3,4}$/, 'Please add a valid CVV'],
      },
      // You can add more fields like billing address if needed
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: {
      type: String, // Hashed OTP
    },
    otpExpires: Date,
  },
  { timestamps: true }
);

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate OTP for authentication
UserSchema.methods.generateOTP = function () {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
  this.otp = crypto.createHash('sha256').update(otp).digest('hex');
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  return otp;
};

// Match user entered OTP to hashed OTP in database
UserSchema.methods.matchOTP = async function (enteredOTP) {
  const hashedEnteredOTP = crypto.createHash('sha256').update(enteredOTP).digest('hex');
  return hashedEnteredOTP === this.otp && this.otpExpires > Date.now();
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
  