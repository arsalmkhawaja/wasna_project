const express = require("express");
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/Restaurant");
const authenticationMiddleware = require("../middleware/auth");

const router = express.Router();

// Routes
router.post("/", createRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.put("/:id", authenticationMiddleware, updateRestaurant);
router.delete("/:id", authenticationMiddleware, deleteRestaurant);

module.exports = router;
