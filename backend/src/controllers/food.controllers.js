const Food = require("../models/food.model")

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
  } catch (error) {
    console.log(`Error - adding new food item was unsuccessful: ${error}`);
    res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
};

module.exports = {
  addFoodItem
};