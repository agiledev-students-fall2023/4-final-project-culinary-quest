// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express() // instantiate an Express object

app.use(cors()) // allow cross-origin resource sharing

app.get("/home", (req, res) => {
    res.send("please send help [crying_face]")
})

const recipeRaw = require('./static/recipes.json')
const ingredientRaw = require('./static/ingredients.json')

// a route to handle fetching all recipes
app.get("/api/recipes", async (req, res) => {
  // load all recipes from json file
  try {
    const recipes = recipeRaw
    res.json({
      recipes: recipes,
      status: 'all good',
    })
  } 
  
  catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve recipes',
    })
  }
})

// a route to handle fetching all ingredients
app.get("/api/ingredients", async (req, res) => {
  // load all ingredients from json file
  try {
    const ingredients = ingredientRaw
    res.json({
      ingredients: ingredients,
      status: 'all good',
    })
  } 
  
  catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve ingredients',
    })
  }
})


// export the express app we created to make it available to other modules
module.exports = app

