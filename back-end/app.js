// import and instantiate express
const express = require("express") // CommonJS import style!

// Middleware to add support for requests from other servers (so the front-end)
// DO NOT REMOVE UNDER ANY CIRCUMSTANCES, THIS IS WHAT ALLOWS THEM TO TALK
const cors = require('cors')

// ----------------------------------------------------------------------------

const app = express() // instantiate an Express object

app.use(cors()) // allows cross-origin resource sharing
app.use(express.json());
// ----------------------------------------------------------------------------

// Required temp json files -- to be replaced by database code in the future
const recipeRaw = require('./static/recipes.json')

const ingredientRaw = require('./static/ingredients.json');
//----------------------------------------------------------------------------

// Initialize Mongoose to communicate with MongoDB database
const mongoose = require('mongoose')

const User = require('./models/User');

require('dotenv').config({ silent: true })

mongoose
  .connect(`${process.env.DB_CONNECTION_URI}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// Home route
app.get("/home", async (req, res) => {
  try {
    res.json({
      message: 'Home route',
      status: 'success',
    })
  } 
  catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed',
    })
  }
})

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Example: Check if email and password are valid (replace this with your actual validation logic)
  const isValidCredentials = (email === 'valid@example.com' && password === 'validpassword');

  if (isValidCredentials) {
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

// Create-Account route
app.post('/api/create-account', (req, res) => {
  const { username, email, password, passwordAgain } = req.body;

  if (username && email && password && passwordAgain) {
    if (password !== passwordAgain) {
      res.status(400).json({
        error: 'Failed to create account', 
        status: 'failed',
      });
    } else {
      // Continue with the account creation logic
      res.json({
        message: 'Account successfully created',
        status: 'success',
      });
    }
  } else {
    res.status(400).json({
      error: 'Failed to create account',
      status: 'failed',
    });
  }
});


// Forgot-Password route
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  if (email) {
    res.json({
      message: 'Password reset email sent',
      status: 'success'
    });
  } else {
    res.status(400).json({
      error: 'Failed to send password reset email',
      status: 'failed'
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
app.post('/api/update-email', async (req, res) => {
  const { newEmail } = req.body;

  if (newEmail) {
    try {
      // Check if a user with this email already exists
      let user = await User.findOne({ email: newEmail });

      if (user) {
        // Email already exists in the database
        res.status(400).json({ error: 'Email already in use', status: 'failed' });
      } else {
        // Create a new user or update existing user logic here
        user = new User({ email: newEmail });
        await user.save();

        res.json({ message: 'Email successfully changed', status: 'success' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error', status: 'failed' });
    }
  } else {
    res.status(400).json({ error: 'Email is required', status: 'failed' });
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


/// INGREDIENTS

const Ingredient = require('./models/Ingredient'); // Import Ingredient model

// Route to fetch all ingredients - ingredient inventory
app.get("/api/ingredients", async (req, res) => {
  const { searchQuery } = req.query;
  try {
    let query = {};
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
    }

    // Fetch and sort ingredients by 'lastViewed' in descending order
    const ingredients = await Ingredient.find(query).sort({ lastViewed: -1 });
    res.json({ ingredients: ingredients, status: 'All good - ingredients have been fetched!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, status: 'Failed to retrieve ingredients :(' });
  }
});

// Rounte to fetch single ingredient 
app.get("/api/ingredients/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Looking up ingredient with ID:", id); // Log the ID

  try {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ status: 'Ingredient not found :(' });
    }

    ingredient.lastViewed = Date.now();
    await ingredient.save();

    res.json(ingredient);
  } catch (err) {
    console.error("Error in /api/ingredients/:id:", err);
    res.status(500).json({ error: err.message, status: 'server error' });
  }
});



// Route for Ingredient Edit 
app.put("/api/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  const { name, amount, imageURL } = req.body;

  // Validation for `name`
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "Invalid name provided." });
  }

  try {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    // If `amount` is an empty string, set it to "Out of Stock"
    ingredient.name = name;
    ingredient.amount = amount && amount.trim() !== '' ? amount : "Out of Stock";
    ingredient.imageURL = imageURL || ingredient.imageURL; // Keep existing imageURL if new one is not provided

    const updatedIngredient = await ingredient.save();

    res.json({ ingredient: updatedIngredient, message: "Ingredient updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating ingredient" });
  }
});


// Route for Ingredient add 
app.post("/api/ingredients", async (req, res) => {
  const { name, amount, imageURL } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: "Ingredient name is required." });
  }

  const finalAmount = amount && amount.trim() !== '' ? amount : "Out of Stock";

  try {
    const newIngredient = new Ingredient({
      name,
      amount: finalAmount,
      imageURL: imageURL || '/apple.jpg',
      lastViewed: Date.now()
    });

    const savedIngredient = await newIngredient.save(); // This will have an _id
    console.log('New ingredient created with ID:', savedIngredient._id);

    res.status(201).json(savedIngredient);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding new ingredient" });
  }
});


// Route for ingredient search
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


// Route to fetch a single recipe
app.get("/api/recipes/single/:recipeId", async (req, res) => {
  try {
    console.log(`recieved: ${req.query.y}`)
    const id = req.query.y
    const recipe = recipeRaw.find(x => x.id == id)

    recipe.lastViewed = Date.now()
    recipeRaw.sort((a,b) => (b.lastViewed || 0) - (a.lastViewed || 0))
    await fs.writeFile('./static/recipes.json', JSON.stringify(recipeRaw, null, 2), 'utf8');

    res.status(200).json({
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
      status: 'failed to find recipes',
    })
  }
})

// Place more routes here

// export the express app we created to make it available to other modules
module.exports = app




// Recipe Edit
app.put("/api/recipes/edit/:id", async (req, res) => {
  console.log("recieved for edit", req.query.x)
  const { id } = req.params; // the id of the recipe to update
  const { name, img, size, time, desc, ingr, steps } = req.body; // the updated values for the recipe

  try {
    // Read the recipes file
    const data = await fs.readFile('./static/recipes.json', 'utf8');
    let recipes = JSON.parse(data);

    // Find the recipe by ID
    const index = recipes.findIndex(recipe => recipe.id === parseInt(id));
    if (index === -1) {
      // If the recipe isn't found, send a 404 response
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Update the recipe
    recipes[index] = { ...recipes[index], name, img, size, time, desc, ingr, steps };

    // Write the updated recipes back to the file
    await fs.writeFile('./static/recipes.json', JSON.stringify(recipes, null, 2), 'utf8');

    // Send a success response
    res.json({ message: "Recipe updated successfully" });
  } catch (err) {
    // If there's an error, log it and send a 500 server error response
    console.error(err);
    res.status(500).json({ message: "Server error while updating recipe" });
  }
});


// Fetch single recipe for edit
app.get("/api/recipes/single/:id", async (req, res) => {
  const id = parseInt(req.params.id); // Use req.params to get the id

  try {
    const data = await fs.readFile('./static/recipes.json', 'utf8');
    const recipes = JSON.parse(data);

    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe); // Send the recipe data as is
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retrieving recipe" });
  }
});




// Recipe add
app.post("/api/recipes", async (req, res) => {
  const { name, img, size, time, desc, ingr, steps } = req.body; // extract ingr from the body directly

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: "Recipe name is required." });
  }

  try {
    const data = await fs.readFile('./static/recipes.json', 'utf8');
    let recipes = JSON.parse(data);

    // Generate the next ID
    const nextId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;

    // Create a new recipe object
    const newRecipe = {
      id: nextId,
      name,
      img,
      size: parseInt(size, 10),
      time: parseInt(time, 10),
      desc,
      ingr, // Use the passed array
      steps,
      lastViewed: Date.now()
    };

    // Append the new recipe to the array
    recipes.push(newRecipe);

    // Write the updated array back to the file
    await fs.writeFile('./static/recipes.json', JSON.stringify(recipes, null, 2), 'utf8');

    // Send a success response with the new recipe
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding new recipe" });
  }
});


