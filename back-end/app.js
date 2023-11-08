// import and instantiate express
const express = require("express") // CommonJS import style!

// Middleware to add support for requests from other servers (so the front-end)
// DO NOT REMOVE UNDER ANY CIRCUMSTANCES THIS IS WHAT ALLOWS THEM TO TALK
const cors = require('cors')

// ----------------------------------------------------------------------------

const app = express() // instantiate an Express object

app.use(cors()) // allows cross-origin resource sharing

// ----------------------------------------------------------------------------

// Required temp json files -- to be replaced by database code in the future
const recipeRaw = require('./static/recipes.json')

// Place more json files here

// ----------------------------------------------------------------------------

// Temporary route message for the home screen (does nothing)
app.get("/home", async (req, res) => {
  res.send("please send help [crying_face]")
})

// Route to fetch all recipes
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

// Route to fetch a single recipe
app.get("/api/recipes/:recipeId", async (req, res) => {
  try {
    console.log(`recieved: ${req.query.y}`)
    const id = req.query.y
    const recipe = recipeRaw.find(x => x.id == id)
    res.json({
      recipe: recipe,
      status: 'all good',
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

// Place more routes here

// export the express app we created to make it available to other modules
module.exports = app
