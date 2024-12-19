// restaurantController.js
const Restaurant = require("../models/Restaurant");

// Create a new restaurant item
const createRestaurant = async (req, res) => {
  try {
    const { name, category, description, price, image } = req.body;
    const restaurant = await Restaurant.create({
      name,
      category,
      description,
      price,
      image,
    });
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all restaurant items
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single restaurant item by ID
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, msg: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a restaurant item by ID
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, image } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, category, description, price, image },
      { new: true, runValidators: true }
    );
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, msg: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a restaurant item by ID
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, msg: "Restaurant not found" });
    }
    res.status(200).json({ success: true, msg: "Restaurant deleted" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
