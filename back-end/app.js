// import and instantiate express
const express = require("express") // CommonJS import style!

// Middleware to add support for requests from other servers (so the front-end)
// DO NOT REMOVE UNDER ANY CIRCUMSTANCES, THIS IS WHAT ALLOWS THEM TO TALK
const cors = require('cors')
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environmental variables from .env file
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
const bcrypt = require('bcrypt');

const User = require('./models/User');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// ---------------------------------------------------------------------------

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });
const path = require('path');

// ---------------------------------------------------------------------------

require('dotenv').config({ silent : true })

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
app.post('/api/create-account', async (req, res) => {
  const { newName, newEmail, newPassword, newRePassword } = req.body;

  if (newName && newEmail && newPassword && newRePassword) {
    if (newPassword !== newRePassword) {
      res.status(400).json({
        error: 'Passwords do not match', 
        status: 'failed',
      });
    } else {
      try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Continue with the account creation logic
        const newUser = new User({
          name: newName,
          email: newEmail,
          password: hashedPassword,
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ newEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
          message: 'Account successfully created',
          status: 'success',
          token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  } else {
    res.status(400).json({
      error: 'Failed to create account',
      status: 'failed',
    });
  }
});

// Profile picture upload route  (need to check once login setup)
app.post('/api/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  try {
    const username = req.user.username;
    const filePath = req.file.path; // This is the path of the uploaded file

    // Update user's profile picture in the database
    const user = await User.findById(username);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    user.profilePicture = filePath;
    await user.save();

    res.send({ message: 'Profile picture uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading file.' });
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
  const username = req.user.username; // Assuming the user ID is stored in req.user.id

  // Validate the email
  if (!newEmail || newEmail.trim() === '') {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the new email is already in use by another user
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Find the logged-in user by username and update their email
    const user = await User.findById(username);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.email = newEmail;
    await user.save();

    res.json({ message: 'Email successfully updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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

// // a route to handle fetching all recipes
// app.get("/api/recipes", async (req, res) => {
//   try {
//     const recipes = recipeRaw
//     res.json({
//       recipes: recipes,
//       status: 'all good',
//     })
//   } 
//   catch (err) {
//     console.error(err)
//     res.status(400).json({
//       error: err,
//       status: 'failed to retrieve recipes',
//     })
//   }
// })


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

// RECIPES
const Recipe = require('./models/Recipe')

// Route to fetch a recipes based on a query
app.get("/api/recipes/search", async (req, res) => {
  try {
    // Take the search terms and split them apart via commas
    // RegEx is used to account for commas with and without spaces after
    let searchTerms = { $regex: req.query.y, $options: 'i' }

    // If the user is filtering by available ingredients
    if (req.query.z == "true") {
      let aIngr = await Ingredient.find({amount: {$ne: "0"}})
      let recipes = await Recipe.find({$or:[{name: searchTerms}, {desc: searchTerms}, {ingr: searchTerms, aIngr}]}).sort({ lastViewed: -1 })
      res.json({recipes: recipes, status: "All good - recipes recieved"})
    }

    // If the user is not filtering by available ingredients
    else {
      if (searchTerms != '') {
        let recipes = await Recipe.find({$or:[{name: searchTerms}, {desc: searchTerms}, {ingr: searchTerms}]}).sort({ lastViewed: -1 })
        res.json({recipes: recipes, status: "All good - recipes recieved"})
      }
      else {
        let recipes = await Recipe.find().sort({ lastViewed: -1 })
        res.json({recipes: recipes, status: "All good - recipes recieved"})
      }
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

// Route to fetch a single recipe
app.get("/api/recipes/single/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log(`recieved: ${id}`)

    const recipe = await Recipe.findById(id)

    recipe.lastViewed = Date.now()
    await recipe.save()

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

// Recipe Edit
app.put("/api/recipes/edit/:id", async (req, res) => {
  const id = req.params.id; // the id of the recipe to update
  const { name, img, size, time, desc, ingr, steps } = req.body; // the updated values for the recipe
  // console.log("recieved for edit", id)
  // console.log("changes: ", req.body)

  try {
    // Read the recipes file
    // const data = await fs.readFile('./static/recipes.json', 'utf8');
    // let recipes = JSON.parse(data);
    const recipe = await Recipe.findById(id)
    // console.log("recipe: ", recipe)

    // // Find the recipe by ID
    // const index = recipes.findIndex(recipe => recipe.id === parseInt(id));
    // if (index === -1) {
    //   // If the recipe isn't found, send a 404 response
    //   return res.status(404).json({ message: "Recipe not found" });
    // }

    // Update the recipe
    // recipes[index] = { ...recipes[index], name, img, size, time, desc, ingr, steps };

    if (name) {
      recipe.name = name
    }
    else if (img) {
      recipe.img = img
    }
    else if (size) {
      recipe.size = size
    }
    else if (time) {
      recipe.time = time
    }
    else if (desc) {
      recipe.desc = desc
    }
    else if (ingr) {
      recipe.ingr = ingr
    }
    else if (steps) {
      recipe.steps = steps
    }
    // console.log("new recipe: ", recipe)

    // Write the updated recipes back to the file
    // await fs.writeFile('./static/recipes.json', JSON.stringify(recipes, null, 2), 'utf8');
    await recipe.save()

    // Send a success response
    // res.json({ message: "Recipe updated successfully" });
    res.status(200).json({
      status: "recipe updated successfully"
    })
  } catch (err) {
    // If there's an error, log it and send a 500 server error response
    console.error(err);
    res.status(400).json({ message: "Server error while updating recipe" });
  }
});


// // Fetch single recipe for edit
// app.get("/api/recipes/single/:id", async (req, res) => {
//   const id = parseInt(req.params.id); // Use req.params to get the id

//   try {
//     const data = await fs.readFile('./static/recipes.json', 'utf8');
//     const recipes = JSON.parse(data);

//     const recipe = recipes.find(r => r.id === id);
//     if (!recipe) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }

//     res.json(recipe); // Send the recipe data as is
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error while retrieving recipe" });
//   }
// });

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

// export the express app we created to make it available to other modules
module.exports = app