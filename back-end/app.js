// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express() // instantiate an Express object

app.use(cors()) // allow cross-origin resource sharing

app.get("/home", (req, res) => {
    res.send("please send help [crying_face]")
})

const recipeRaw = require('./static/recipes.json')

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

// export the express app we created to make it available to other modules
module.exports = app
