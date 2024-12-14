const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerAdmin,
  registerUser,
  login,
  deleteUser,
  editUser,
  getAdminProfile,
  getAllAdmins,
  getAllUsers,
  getUserProfile,
  updateUserStatus,
} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register/admin", upload.single("profileImage"), registerAdmin);
router.post("/register/user", upload.single("profileImage"), registerUser);
router.post("/login", login);

router.get("/users", authMiddleware, getAllUsers);
router.get("/admins", authMiddleware, getAllAdmins);

router.get("/admin", authMiddleware, getAdminProfile);
router.get("/user", authMiddleware, getUserProfile);

router.patch("/user/status/:userID", authMiddleware, updateUserStatus);

router.put(
  "/user/:id",
  authMiddleware,
  upload.single("profileImage"),
  editUser
);
router.delete("/user/:id", authMiddleware, deleteUser);

module.exports = router;
