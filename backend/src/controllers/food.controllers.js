const Food = require("../models/food.model.js");

const addFoodItem = async (req, res) => {
  try {
    const { foodName, price, stock } = req.body;

    const newFoodItem = new Food({
      foodName,
      price,
      stock
    });

    await newFoodItem.save();

    res.status(201).json({
      message: "New food item added successfully",
      success: true
    });
  } catch (err) {
    console.log(`Error - adding new food item was unsuccessful: ${err}`);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const getFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find().limit(12);

    res.status(200).send({
      foodItems,
      success: true
    });
  } catch (err) {
    console.log(`Error - getting food items was unsuccessful: ${err}`);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = {
  addFoodItem,
  getFoodItems
};