const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  imageURL: String,
  lastViewed: Date, 
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
