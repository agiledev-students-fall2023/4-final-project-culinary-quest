// import and instantiate express
const express = require("express") // CommonJS import style!

// Middleware to add support for requests from other servers (so the front-end)
// DO NOT REMOVE UNDER ANY CIRCUMSTANCES THIS IS WHAT ALLOWS THEM TO TALK
const cors = require('cors')

// ----------------------------------------------------------------------------

const app = express() // instantiate an Express object

app.use(cors()) // allows cross-origin resource sharing
app.use(express.json());
// ----------------------------------------------------------------------------

// Required temp json files -- to be replaced by database code in the future
const recipeRaw = require('./static/recipes.json')

const ingredientRaw = require('./static/ingredients.json')
//----------------------------------------------------------------------------

// Temporary route message for the home screen (does nothing)
app.get("/home", async (req, res) => {
  res.send("please send help [crying_face]")
})
// Login route
app.get('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      message: 'Login successful',
      status: 'success',
    });
  } else {
    res.status(401).json({
      error: 'Invalid credentials',
      status: 'failed',
    });
  }
});

// a route to handle fetching all recipes
app.get("/api/recipes", async (req, res) => {
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

app.get("/api/ingredients/:id", async (req, res) => {
  const id = req.params.id; // Extract the ID from the URL
  try {
    const ingredient = ingredientRaw.find(i => i.id.toString() === id); // Find the ingredient by ID
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ status: 'ingredient not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
      status: 'server error',
    });
  }
});

// Route to fetch a single recipe
app.get("/api/recipes/single/:recipeId", async (req, res) => {
  try {
    // console.log(`recieved: ${req.query.y}`)
    const id = req.query.y
    const recipe = recipeRaw.find(x => x.id == id)
    res.json({
      recipe: recipe,
      status: 'all good - single',
    })
  } 
  catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve recipe',
    })
  }
})

// Route to fetch a recipes based on a query
app.get("/api/recipes/search", async (req, res) => {
  try {
    // console.log(`recieved terms: ${req.query.y}`)
    // Take the search terms and split them apart via commas
    // RegEx is used to account for commas with and without spaces after
    const searchTerms = req.query.y.split(/, |,/)
    const filteredRecipes = recipeRaw.filter(recipe => {
      let isValid = true
      for (let i = 0; i < searchTerms.length; i++) {
        // console.log("condition: ", isValid)
        isValid = isValid && (recipe.name.includes(searchTerms[i]) || recipe.desc.includes(searchTerms[i]))
      }
      return isValid
    })
    // console.log("filtered results: ", filteredRecipes)
    res.json({
      recipes: filteredRecipes,
      status: 'all good - search',
    })
  } 
  catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to filter recipes',
    })
  }
})

// Place more routes here

// export the express app we created to make it available to other modules
module.exports = app

