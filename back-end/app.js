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

const ingredientRaw = require('./static/ingredients.json');
const { emitWarning } = require("process");
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

// Change-Username route
app.post('/api/change-username', (req, res) => {
  const { newUsername } = req.body;

  if (newUsername) {
    res.json({
      message: 'Username successfully changed',
      status: 'success'
    });
  } else {
    res.status(400).json({
      error: 'Failed to reset username',
      status: 'failed'
    });
  }
});

// Change-Password route
app.post('/api/change-password', (req, res) => {
  const { password, newPassword, newPasswordAgain } = req.body;
  if (password && newPassword && newPasswordAgain) {
    res.json({
      message: 'Password successfully changed',
      status: 'success',
    });
  } else {
    res.status(400).json({
      error: 'Failed to reset password',
      status: 'failed',
    });
  }
});

// Update-Email route
app.post('/api/update-email', (req, res) => {
  const { newEmail } = req.body;

  if (newEmail) {
    res.json({
      message: 'Email successfully changed',
      status: 'success'
    });
  } else {
    res.status(400).json({
      error: 'Failed to reset email',
      status: 'failed'
    });
  }
});

// Update-Phone route
app.post('/api/update-phone', (req, res) => {
  const { newPhone } = req.body;

  if (newPhone) {
    res.json({
      message: 'Phone number successfully changed',
      status: 'success'
    });
  } else {
    res.status(400).json({
      error: 'Failed to reset phone number',
      status: 'failed'
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
  // search functionality
  const{ searchQuery } = req.query;
  //console.log('Received searchQuery:', searchQuery);

  // load all ingredients from json file
  try {
    let ingredients = ingredientRaw
    if(searchQuery){
      //if there is a search query, need to filter (checking by ingredient.name)
      ingredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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

// fetch a single ingredient
app.get("/api/ingredients/:id", async (req, res) => {
  const id = parseInt(req.params.id); // Extract the ID from the URL
  try {
    const data = await fs.readFile('./static/ingredients.json', 'utf8');
    let ingredients = JSON.parse(data);
    
    // Find the ingredient by ID
    const ingredientIndex = ingredients.findIndex(i => i.id === id);
    if (ingredientIndex === -1) {
      res.status(404).json({ status: 'ingredient not found' });
      return;
    }
    
    // Update the lastViewed timestamp
    ingredients[ingredientIndex].lastViewed = Date.now();

    // Sort the ingredients based on lastViewed with the most recent first
    ingredients.sort((a, b) => (b.lastViewed || 0) - (a.lastViewed || 0));

    // Write the updated ingredients back to the file
    await fs.writeFile('./static/ingredients.json', JSON.stringify(ingredients, null, 2), 'utf8');

    // Send back the updated ingredient
    res.json(ingredients[ingredientIndex]);
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

    recipe.lastViewed = Date.now()
    recipeRaw.sort((a,b) => (b.lastViewed || 0) - (a.lastViewed || 0))
    await fs.writeFile('./static/recipes.json', JSON.stringify(recipeRaw, null, 2), 'utf8');

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
    let searchTerms = req.query.y.split(/, |,/)
    // console.log("toggle: ", req.query.z)
    // console.log("tf:", req.query.z == "true")
    // If the user is filtering by available ingredients
    if (req.query.z == "true") {
      // console.log("filter")
      let filteredRecipes = recipeRaw.filter(recipe => {
        let isValid = true
        
        for (let i = 0; i < searchTerms.length; i++) {
          // console.log("condition: ", isValid)
          isValid = isValid && (recipe.name.toLowerCase().includes(searchTerms[i].toLowerCase()) || recipe.desc.includes(searchTerms[i]))
        }
        return isValid
      })

      filteredRecipes = filteredRecipes.filter(recipe => {
        let isValid = false
        
        for (let i = 0; i < recipe.ingr.length; i++) {
          for (let j = 0; j < ingredientRaw.length; j++) {
            isValid = isValid || ingredientRaw[j].name.toLowerCase() == recipe.ingr[i].toLowerCase()
          }
        }
        return isValid
      })

      res.json({
        recipes: filteredRecipes,
        status: 'all good - search',
      })
    }

    // If the user is not filtering by available ingredients
    else {
      // console.log("no filter")
      let filteredRecipes = recipeRaw.filter(recipe => {
        let isValid = true
        for (let i = 0; i < searchTerms.length; i++) {
          // console.log("condition: ", isValid)
          isValid = isValid && (recipe.name.includes(searchTerms[i]) || recipe.desc.includes(searchTerms[i]))
        }
        return isValid
      })

      res.json({
        recipes: filteredRecipes,
        status: 'all good - search',
      })
    }
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



// Ingredient Edit 

const fs = require('fs').promises; // This allows us to use async/await with file system operations
app.put("/api/ingredients/:id", async (req, res) => {
  const { id } = req.params; // the id of the ingredient to update
  const { name, amount, imageURL } = req.body; // the updated values for the ingredient

  try {
    // Read the ingredients file
    const data = await fs.readFile('./static/ingredients.json', 'utf8');
    const ingredients = JSON.parse(data);

    // Find the ingredient by ID
    const index = ingredients.findIndex(ingredient => ingredient.id === parseInt(id));
    if (index === -1) {
      // If the ingredient isn't found, send a 404 response
      return res.status(404).json({ message: "Ingredient not found" });
    }

    // Update the ingredient
    ingredients[index] = { ...ingredients[index], name, amount, imageURL };

    // Write the updated ingredients back to the file
    await fs.writeFile('./static/ingredients.json', JSON.stringify(ingredients, null, 2), 'utf8');

    // Send a success response
    res.json({ message: "Ingredient updated successfully" });
  } catch (err) {
    // If there's an error, log it and send a 500 server error response
    console.error(err);
    res.status(500).json({ message: "Server error while updating ingredient" });
  }
});

// Ingredient add 
app.post("/api/ingredients", async (req, res) => {
  const { name, amount, imageURL } = req.body; // the new ingredient's data

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: "Ingredient name is required." });
  }

  const finalAmount = amount && amount.trim() !== '' ? amount : "Out of Stock";

  try {
    const data = await fs.readFile('./static/ingredients.json', 'utf8');
    let ingredients = JSON.parse(data);

    // Generate the next ID
    const nextId = ingredients.length > 0 ? Math.max(...ingredients.map(i => i.id)) + 1 : 0;

    // Create a new ingredient object with the current timestamp for lastViewed
    const newIngredient = { 
      id: nextId, 
      name, 
      amount: finalAmount, 
      imageURL: imageURL || '/apple.jpg', // Use provided imageURL or default to '/apple.jpg'
      lastViewed: Date.now()  // Set the lastViewed to the current timestamp
    };

    // Append the new ingredient to the array
    ingredients.push(newIngredient);

    // Write the updated array back to the file
    await fs.writeFile('./static/ingredients.json', JSON.stringify(ingredients, null, 2), 'utf8');

    // Send a success response with the new ingredient
    res.status(201).json(newIngredient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding new ingredient" });
  }
});


// search query for ingredients
app.get("/api/ingredients/:name", async (req, res) => {
  try {
    // get the search query from the URL 
    const searchQuery = req.params.name;

    // make sure ingredients is defined 
    let ingredients = [];

    if (searchQuery) {
      // if there is a search query, filter ingredients by name
      ingredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    res.json({
      ingredients: ingredients,
      status: 'all good',
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: 'failed to retrieve ingredients',
    });
  }
});
