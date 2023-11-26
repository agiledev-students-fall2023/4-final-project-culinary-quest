const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  imageURL: String,
  lastViewed: Date
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
