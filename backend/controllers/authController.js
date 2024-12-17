// backend/controllers/authController.js
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const twilioService = require('../utils/twilioService');
const sendEmail = require('../utils/sendEmail'); // Optional: If email notifications are needed
const logger = require('../utils/logger'); // Winston logger

// Generate JWT (Optional: If you plan to use JWT for authenticated routes)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, phone, address, password, paymentDetails } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this phone number');
  }

  // Create user
  const user = await User.create({
    name,
    phone,
    address,
    password,
    paymentDetails,
  });

  if (user) {
    // Generate OTP
    const otp = user.generateOTP();
    await user.save({ validateBeforeSave: false });

    // Send OTP via Twilio
    twilioService.sendSMS(
      user.phone,
      `Welcome to Wasna Event Complex, ${user.name}! Your OTP is ${otp}. It is valid for 10 minutes.`
    );

    logger.info(`OTP sent to new user: ${user.phone}`);

    res.status(201).json({
      message: 'OTP sent to your phone. Please verify to complete registration.',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Verify OTP during registration
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error('User is already verified');
  }

  const isMatch = await user.matchOTP(otp);

  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  logger.info(`User verified: ${user.phone}`);

  res.status(200).json({
    message: 'Phone number verified successfully',
    // Optional: Generate and return JWT token
    token: generateToken(user._id),
  });
});

// @desc    Login user by sending OTP
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    res.status(401);
    throw new Error('Please verify your phone number before logging in');
  }

  // Generate OTP
  const otp = user.generateOTP();
  await user.save({ validateBeforeSave: false });

  // Send OTP via Twilio
  twilioService.sendSMS(
    user.phone,
    `Hello ${user.name}, your login OTP is ${otp}. It is valid for 10 minutes.`
  );

  logger.info(`Login OTP sent to user: ${user.phone}`);

  res.status(200).json({
    message: 'OTP sent to your phone. Please verify to log in.',
  });
});

// @desc    Verify OTP during login
// @route   POST /api/auth/verify-login-otp
// @access  Public
exports.verifyLoginOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const isMatch = await user.matchOTP(otp);

  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  logger.info(`User logged in: ${user.phone}`);

  res.status(200).json({
    message: 'Login successful',
    token: generateToken(user._id),
  });
});

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Generate OTP
  const otp = user.generateOTP();
  await user.save({ validateBeforeSave: false });

  // Send OTP via Twilio
  twilioService.sendSMS(
    user.phone,
    `Hello ${user.name}, your password reset OTP is ${otp}. It is valid for 10 minutes.`
  );

  logger.info(`Password reset OTP sent to user: ${user.phone}`);

  res.status(200).json({
    message: 'OTP sent to your phone for password reset',
  });
});

// @desc    Reset Password - Verify OTP and Set New Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = asyncHandler(async (req, res) => {
  const { phone, otp, newPassword } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const isMatch = await user.matchOTP(otp);

  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  user.password = newPassword;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  logger.info(`User reset password: ${user.phone}`);

  res.status(200).json({
    message: 'Password reset successful',
    token: generateToken(user._id),
  });
});
