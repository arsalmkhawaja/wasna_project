const express = require("express");
const router = express.Router();
const { register, login, getProfile, updateProfile } = require("../controllers/User");
const authenticationMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticationMiddleware, getProfile);
router.patch("/profile", authenticationMiddleware, updateProfile); 

module.exports = router;
