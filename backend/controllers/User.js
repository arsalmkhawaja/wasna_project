const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register Controller
const register = async (req, res) => {
  try {
    const {
      password,
      fullName,
      dateOfBirth,
      gender,
      phoneNumber,
      profileImage,
    } = req.body;

    const user = await User.create({
      password,
      fullName,
      dateOfBirth,
      gender,
      phoneNumber,
      profileImage,
    });

    const token = jwt.sign(
      { id: user._id, name: user.fullName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Token valid for 1 day
      }
    );

    res
      .status(201)
      .json({ user: { id: user._id, name: user.fullName }, token });
  } catch (error) {
    res.status(400).json({ msg: "Error creating user", error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { fullName, password } = req.body;

    if (!fullName || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide fullName and password" });
    }

    const user = await User.findOne({ fullName });
    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.fullName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res
      .status(200)
      .json({ user: { id: user._id, name: user.fullName }, token });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Protected Route Controller
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
// Update Profile Controller
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fields that can be updated
    const updateFields = {
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      profileImage: req.body.profileImage,
    };

    // Remove undefined fields (only update provided values)
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
