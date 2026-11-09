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
    console.log(`Error - adding new food item was not successful: ${err}`);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const getFoodItems = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    const foodItems = await Food.find().skip((page - 1) * limit).limit(limit);
    let count = await Food.find().countDocuments();
    if (count === 0) count = limit;

    res.status(200).send({
      foodItems,
      totalPages: Math.ceil(count / limit),
      success: true
    });
  } catch (err) {
    console.log(`Error - getting food items was not successful: ${err}`);
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