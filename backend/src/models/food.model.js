const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const foodSchema = new Schema({
  img: {
    type: String,
    default: ""
  },
  foodName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true
  }
});

const Food = model("food", foodSchema);

module.exports = Food;