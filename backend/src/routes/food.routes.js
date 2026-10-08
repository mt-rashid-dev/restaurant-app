const express = require("express");

const {
  addFoodItem
} = require("../controllers/food.controllers");

const foodRoutes = express.Router();

// POST: /api/foods/add-food-item
foodRoutes.post("/add-food-item", addFoodItem);

module.exports = foodRoutes;