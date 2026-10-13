const express = require("express");

const {
  addFoodItem,
  getFoodItems
} = require("../controllers/food.controllers");

const foodRoutes = express.Router();

// POST: /api/foods/add-food-item
foodRoutes.post("/add-food-item", addFoodItem);

// GET: /api/foods/get-food-items
foodRoutes.get("/get-food-items", getFoodItems);

module.exports = foodRoutes;