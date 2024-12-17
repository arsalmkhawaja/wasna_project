// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyOTP,
  loginUser,
  verifyLoginOTP,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { check } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('address', 'Address is required').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('paymentDetails.cardNumber', 'Card number is required').not().isEmpty(),
    check('paymentDetails.cardHolderName', 'Card holder name is required').not().isEmpty(),
    check('paymentDetails.expiryDate', 'Expiry date is required').not().isEmpty(),
    check('paymentDetails.cvv', 'CVV is required').not().isEmpty(),
  ],
  validate,
  registerUser
);

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP during registration
// @access  Public
router.post(
  '/verify-otp',
  [
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('otp', 'OTP must be a 6-digit number').isLength({ min: 6, max: 6 }),
  ],
  validate,
  verifyOTP
);

// @route   POST /api/auth/login
// @desc    Login user by sending OTP
// @access  Public
router.post(
  '/login',
  [check('phone', 'Please include a valid phone number').isMobilePhone()],
  validate,
  loginUser
);

// @route   POST /api/auth/verify-login-otp
// @desc    Verify OTP during login
// @access  Public
router.post(
  '/verify-login-otp',
  [
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('otp', 'OTP must be a 6-digit number').isLength({ min: 6, max: 6 }),
  ],
  validate,
  verifyLoginOTP
);

// @route   POST /api/auth/forgot-password
// @desc    Initiate password reset by sending OTP
// @access  Public
router.post(
  '/forgot-password',
  [check('phone', 'Please include a valid phone number').isMobilePhone()],
  validate,
  forgotPassword
);

// @route   POST /api/auth/reset-password
// @desc    Reset password after verifying OTP
// @access  Public
router.post(
  '/reset-password',
  [
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('otp', 'OTP must be a 6-digit number').isLength({ min: 6, max: 6 }),
    check('newPassword', 'New password must be 6 or more characters').isLength({ min: 6 }),
  ],
  validate,
  resetPassword
);

module.exports = router;
