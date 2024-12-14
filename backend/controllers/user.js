const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const User = require("../models/User"); // Change to User model

const registerAdmin = async (req, res) => {
  const {
    fullName,
    gender,
    dateOfBirth,
    position,
    phoneNumber,
    address,
    email,
    password,
  } = req.body;

  if (
    !email ||
    !password ||
    !fullName ||
    !gender ||
    !dateOfBirth ||
    !position ||
    !phoneNumber ||
    !address
  ) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const profileImage = req.file ? req.file.path : undefined;
    const admin = new Admin({
      fullName,
      gender,
      dateOfBirth,
      position,
      phoneNumber,
      address,
      email,
      password,
      profileImage,
    });
    await admin.save();

    res.status(201).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const {
    userID,
    fullName,
    dateOfBirth,
    gender,
    address,
    phoneNumber,
    email,
    password,
  } = req.body;

  if (!userID || !fullName || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    const userExists = await User.findOne({ email }); // Change to User model
    if (userExists) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const profileImage = req.file ? req.file.path : undefined;
    const user = new User({
      userID,
      fullName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      email,
      password,
      profileImage,
    });
    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateUserStatus = async (req, res) => {
  const { status } = req.body;
  const { userID } = req.params;
  const validStatuses = ["In-Call", "Offline", "Paused", "Online"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      msg: "Invalid status. Valid statuses are: 'in call', 'offline', 'paused', 'online'",
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { userID },
      { $set: { status } }, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User status updated successfully",
      user: {
        userID: user.userID,
        fullName: user.fullName,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const editUser = async (req, res) => {
  const {
    userID,
    fullName,
    dateOfBirth,
    gender,
    address,
    phoneNumber,
    email,
    password,
  } = req.body;

  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (userID) user.userID = userID;
    if (fullName) user.fullName = fullName;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (address) user.address = address;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;
    if (password) user.password = password;

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id); 

    res.status(200).json({ msg: "User removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ msg: "Please provide email, password, and role" });
  }

  try {
    let user;
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "user") {
      user = await User.findOne({ email }); 
    }

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials - User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      userID: role === "user" ? user.userID : null,
      status: role === "user" ? user.status : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json({ admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  registerAdmin,
  registerUser,
  login,
  deleteUser,
  editUser,
  getAdminProfile,
  getAllUsers,
  getAllAdmins,
  getUserProfile,
  updateUserStatus,
};
