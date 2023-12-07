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

const User = require('./models/User');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const bcrypt = require("bcrypt");
const { axiosWithAuth } = require('../front-end/src/api');
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

require('dotenv').config({ silent: true })

mongoose
  .connect(`${process.env.DB_CONNECTION_URI}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))


const defaultIngredients = [
 { name: 'Salt' },
 { name: 'Pepper' },
 { name: 'Flour' },
 { name: 'Eggs' },
 { name: 'Milk' },
 { name: 'Butter' },
 { name: 'Olive Oil' },
 { name: 'Bread' },
 { name: 'Pasta' },
 { name: 'Rice' }
  ];

const defaultRecipes = [
  { name: 'Waffles', 
  size: 4,
  time: 30,
  desc: "Here's your new go-to waffle recipe for family breakfast, a brunch gathering, or just because. By Martha Stewart!",
  ingr: ["1 cup all-purpose flour, spooned and leveled",
    "2 tablespoons sugar","1 teaspoon baking powder",
    "¼ teaspoon salt","1 cup milk","2 large eggs", "4 tablespoons (½ stick) unsalted butter, melted"], 
  steps: ["Step 1: Preheat waffle iron and combine dry ingredients: Preheat waffle iron according to manufacturer's instructions. In a large bowl, whisk flour, sugar, baking powder, and salt; set aside.",
  "Step 2: Whisk milk and eggs and add to flour: In a small bowl, whisk milk and eggs; pour over flour mixture, and whisk gently to combine (don't overmix). " ,
  "Step 3: Add melted butter: Gently whisk in butter.",
  "Step 4: Cook waffles: Following manufacturer's instructions, cook waffles until deep brown and crisp. (For a standard waffle iron, pour a generous 1/2 cup of batter into center, spreading to within 1/2 inch of edges, and close; waffle will cook in 2 to 3 minutes.)",
  "Step 5: Serve warm: Serve warm, with maple syrup and butter, as desired"]
  },

  { name: 'Pancakes',
  size: 4,
  time: 20,
  desc: "This simple recipe will become your go-to for making fluffy pancakes from scratch.  By Martha Stewart!",
  ingr: ["1 cup all-purpose flour, (spooned and leveled)", "2 tablespoons sugar", 
    "2 teaspoons baking powder", "½ teaspoon salt", "1 cup milk", "2 tablespoons unsalted butter, melted, or vegetable oil",
    "1 large egg", "1 tablespoon vegetable oil"], 
  steps: ["Step 1: Gather ingredients and preheat oven: Preheat oven to 200 degrees. Have a baking sheet or heatproof platter ready to keep cooked pancakes warm in the oven.",
  "Step 2: Mix dry ingredients: In a small bowl, whisk together flour, sugar, baking powder, and salt; set aside.",
  "Step 3: Mix wet ingredients: In a medium bowl, whisk together milk, butter (or oil), and egg.",
  "Step 4: Combine wet and dry ingredients: Add dry ingredients to milk mixture; whisk until just moistened. (Do not overmix; a few small lumps are fine.)",
  "Step 5: Heat and oil skillet or griddle: Heat a large skillet (nonstick or cast-iron) or griddle over medium. Fold a sheet of paper towel in half, and moisten with oil; carefully rub skillet with oiled paper towel.",
  "Step 6: Spoon batter onto skillet or griddle: For each pancake, spoon 2 to 3 tablespoons of batter onto skillet, using the back of the spoon to spread batter into a round (you should be able to fit 2 to 3 in a large skillet).",
  "Step 7: Cook first side: Cook until surface of pancakes have some bubbles and a few have burst, 1 to 2 minutes.",
  "Step 8: Flip pancakes: Flip carefully with a thin spatula, and cook until browned on the underside, 1 to 2 minutes more.",
  "Step 9:Serve immediately, or keep warm in oven: Transfer to a baking sheet or platter; cover loosely with aluminum foil, and keep warm in oven. Continue with more oil and remaining batter. (You'll have 12 to 15 pancakes.) Serve warm, with desired toppings."]
  },

  { name: 'Easy Chicken Noodle Soup',
  size: 6,
  time: 35,
  desc: "Homemade chicken noodle soup is pure comfort in a bowl.", 
  ingr: ["1 tablespoon olive oil", "2 stalks celery, diced small", "2 medium carrots, diced medium", 
    "1 medium yellow onion, diced small", "Salt and pepper", "4 cups chicken broth", "1 ¼ pounds boneless, skinless chicken breasts", 
    "6 ounces vermicelli or angel-hair pasta, broken into 1 ½-inch pieces", "¼ cup chopped fresh dill"],
  steps: ["Step 1: Sauté celery, carrots, and onions: In a large pot, heat oil over medium-high. Add celery, carrots, and onion and cook until celery and carrots are crisp-tender, about 5 minutes; season with salt and pepper.",
  "Step 2: Add broth and water: Add broth and 4 cups water and bring to a boil.",
  "Step 3: Cook chicken: Add chicken, reduce to a simmer, and cover. Cook until chicken is cooked through, about 10 minutes.",
  "Step 4: Shred chicken: With tongs, remove chicken and chop or shred into bite-size pieces.",
  "Step 5: Cook pasta: Add pasta to pot and cook until tender, about 4 minutes; season with salt and pepper.",
  "Step 6: Serve: To serve, stir in chicken and dill."]
  },

  { name: 'Pan-Fried Steak',
  size: 2,
  time: 15,
  desc: "Make a restaurant-quality steak in 15 minutes.",
  ingr: ["2 strip steaks (each about 1 inch thick), room temperature", "Kosher salt and freshly ground pepper",
  "1 teaspoon unsalted butter"],
  steps: ["Step 1: Heat pan and season steaks: Heat a large heavy-bottomed skillet (preferably cast iron) over high 5 minutes. Generously season steaks with salt and pepper.",
  "Step 2: Cook steaks: Add 1/2 teaspoon butter to pan, then immediately top with one steak. Repeat with remaining 1/2 teaspoon butter and steak. Cook without moving steaks until a golden brown crust forms, 3 to 4 minutes.",
  "Step 3: Turn steaks and cook: Turn and cook 2 minutes more for rare, or 3 to 4 minutes more for medium-rare.",
  "Step 4: Rest, then slice: Transfer to a cutting board and let rest 5 minutes. Slice steaks against the grain; serve with sauce, if desired."]
  },





  { name: 'Milk' },
  { name: 'Butter' },
  { name: 'Olive Oil' },
  { name: 'Bread' },
  { name: 'Pasta' },
  { name: 'Rice' }
   ];
   
        //size: Number,
        //time: Number,
        //desc: String,
        //ingr: [String],
        //steps: [String],

// Create-Account route
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

app.post('/api/create-account', async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { newName, newUsername, newPassword, newRePassword } = req.body;

    // Check if any of the required fields are missing
    if (!newName || !newUsername || !newPassword || !newRePassword) {
      console.log('Error: All fields are required');
      return res.status(400).json({
        error: 'All fields are required',
        status: 'failed',
      });
    }

    // Check if passwords match
    if (newPassword !== newRePassword) {
      console.log('Error: Passwords do not match');
      return res.status(400).json({
        error: 'Passwords do not match',
        status: 'failed',
      });
    }

    // Validate password with regex
    if (!passwordRegex.test(newPassword)) {
      console.log('Error: Invalid password');
      return res.status(400).json({
        error: 'Invalid password. It must be at least 8 characters long, contain at least one number, one special character, and one uppercase letter.',
        status: 'failed',
      });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username: newUsername });

    if (existingUser) {
      console.log('Error: Username already in use');
      return res.status(400).json({
        error: 'Username already in use',
        status: 'failed',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Continue with the account creation logic
    const newUser = new User({
      username: newName,
      username: newUsername,
      password: hashedPassword,
    });

    // Save the user to the database
    try {
      await newUser.save();

      // Create and associate default ingredients with the new user
      const userDefaultIngredients = defaultIngredients.map(ingredient => ({
        ...ingredient,
        user_id: newUser._id, // Replace with your ingredient schema's user reference
        amount: 1,
        imageURL: "/apple.jpg",
        lastViewed: Date.now()
      }));

      // Insert default ingredients into the database
      await Ingredient.insertMany(userDefaultIngredients);

      // Create and associate default recipes with the new user
      const userDefaultRecipes = defaultRecipes.map(recipe => ({
        ...recipe,
        user_id: newUser._id, // Replace with your ingredient schema's user reference
        img: "/pasta.jpg",
        lastViewed: Date.now()
      }));
      
      // Insert default recipes into the database
      await Recipe.insertMany(userDefaultRecipes);

      const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Add console log to see the JWT token
      console.log('Generated JWT token:', token);

      // Send a JSON response indicating success and the need to redirect
      res.json({ message: 'Account successfully created', status: 'success', token, redirect: '/login' });
    } catch (error) {
      console.error('Error saving user to the database:', error);
      return res.status(500).json({
        error: 'Error saving user to the database',
        status: 'failed',
      });
    }
  
    
  } catch (error) {
    console.error('Unhandled error in create-account route:', error);
    res.status(500).json({
      error: `Server error: ${error.message}`,
      status: 'failed',
    });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Log the generated token
      console.log('Generated JWT token:', token);

      res.json({ message: 'Login successful', status: 'success', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials', status: 'failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error', status: 'failed' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      status: 'failed',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: 'Invalid token',
        status: 'failed',
      });
    }

    req.user = decoded;
    next();
  });
};

app.get("/home", verifyToken, async (req, res) => {
  try {
    // Access the JWT token from the request headers
    const token = req.headers.authorization;
    console.log('Received token in /home route:', token);

    // Access the authenticated user's information from req.user
    const { userId, username } = req.user;

    // Your route logic here
    res.json({
      message: 'Home route',
      status: 'success',
      userId,
      username,
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      status: 'failed',
    });
  }
});

app.get('/api/protected-route', verifyToken, (req, res) => {
  try {
    // Access the authenticated user's information from req.user
    const { userId, username } = req.user;

    // Your protected route logic here
    res.json({
      message: 'This is a protected route',
      status: 'success',
      userId,
      username,
    });
  } catch (error) {
    console.error('Error in protected route:', error);
    res.status(500).json({
      error: 'Internal server error',
      status: 'failed',
    });
  }
});

// Profile picture upload route  (need to check once login setup)
app.post('/api/upload-profile-picture', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const {imageURL} = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = imageURL || user.imageURL;

    const updatedUser = await user.save();

    res.json({ user: updatedUser, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating image" });
  }
  
});

// Get user profile
app.get('/api/user', verifyToken, async (req, res) => {
  try {
      // Assuming your authenticateToken middleware adds the user ID to req.user
      const user = await User.findById(req.user.userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json({ user: user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});


// Forgot-Password route
app.post('/api/forgot-password', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Username found, respond with success message
      res.json({
        message: 'Password reset username sent',
        status: 'success'
      });
    } else {
      // Username not found, respond with error message
      res.status(400).json({
        error: 'Username not found in the database',
        status: 'failed'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error in forgot-password route:', error);
    res.status(500).json({
      error: 'Internal server error',
      status: 'failed'
    });
  }
});

// Reset Password route
app.post('/api/reset-password', verifyToken, async (req, res) => {
  const { newPassword, newPasswordAgain } = req.body;
  const userId = req.user.userId; // Extract userId from the JWT token

  // Check if all fields are provided
  if (!newPassword || !newPasswordAgain) {
    return res.status(400).json({
      error: 'All fields are required',
      status: 'failed',
    });
  }

  // Validate password with regex
  if (!passwordRegex.test(newPassword)) {
    console.log('Error: Invalid password');
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, contain at least one number, one special character, and one uppercase letter.',
      status: 'failed',
    });
  }

  try {
    // Find the logged-in user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if newPassword and newPasswordAgain match
    if (newPassword !== newPasswordAgain) {
      return res.status(400).json({ error: 'New passwords do not match', status: 'failed' });
    }

    // Update the user's password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password successfully changed', status: 'success' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', status: 'failed' });
  }
});

// Delete Account route
app.delete('/api/delete-account', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
      // Find and delete the user
      await User.findByIdAndDelete(userId);

      res.json({ message: 'Account successfully deleted' });
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// Change-Username route
app.post('/api/change-username', verifyToken, async (req, res) => {
  const { newUsername } = req.body;
  const userId = req.user.userId; // Extract userId from the JWT token

  // Validate the username
  if (!newUsername || newUsername.trim() === '') {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    // Check if the new username is already in use by another user
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Find the logged-in user by userId and update their username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.username = newUsername;
    await user.save();

    res.json({ message: 'Username successfully updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change-Password route
app.post('/api/change-password', verifyToken, async (req, res) => {
  const { password, newPassword, newPasswordAgain } = req.body;
  const userId = req.user.userId; // Extract userId from the JWT token

  // Check if all fields are provided
  if (!password || !newPassword || !newPasswordAgain) {
    return res.status(400).json({
      error: 'All fields are required',
      status: 'failed',
    });
  }

  // Validate password with regex
  if (!passwordRegex.test(newPassword)) {
    console.log('Error: Invalid password');
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, contain at least one number, one special character, and one uppercase letter.',
      status: 'failed',
    });
  }
  
  try {
    // Find the logged-in user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password matches the user's password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect', status: 'failed' });
    }

    // Check if newPassword and newPasswordAgain match
    if (newPassword !== newPasswordAgain) {
      return res.status(400).json({ error: 'New passwords do not match', status: 'failed' });
    }

    // Check if newPassword is different from the current password
    if (password === newPassword) {
      return res.status(400).json({ error: 'New password must be different from the current password', status: 'failed' });
    }

    // Update the user's password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password successfully changed', status: 'success' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', status: 'failed' });
  }
});

// Update-username route
app.post('/api/update-username', verifyToken, async (req, res) => {
  const { newUsername } = req.body;
  const username = req.user.username; // Assuming the user ID is stored in req.user.id

  // Validate the username
  if (!newUsername || newUsername.trim() === '') {
    return res.status(400).json({ message: "username is required." });
  }

  try {
    // Check if the new username is already in use by another user
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).json({ message: 'username already in use' });
    }

    // Find the logged-in user by username and update their username
    const user = await User.findById(username);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.username = newUsername;
    await user.save();

    res.json({ message: 'username successfully updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update-Phone route
app.post('/api/update-phone', verifyToken, async (req, res) => {
  const { newPhone } = req.body;
  const username = req.user.username;

  // Validate the phone number
  if (!newPhone || newPhone.trim() === '') {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    // Find the logged-in user by username and update their phone number
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.phone = newPhone;
    await user.save();

    res.json({ message: 'Phone number successfully updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
// app.get("/api/ingredients", async (req, res) => {
//   const { searchQuery } = req.query;
//   console.log("gg2")
//   try {
//     let query = {};
//     if (searchQuery) {
//       query.name = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
//     }

//     // Fetch and sort ingredients by 'lastViewed' in descending order
//     const ingredients = await Ingredient.find(query).sort({ lastViewed: -1 });
//     res.json({ ingredients: ingredients, status: 'All good - ingredients have been fetched!' });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err, status: 'Failed to retrieve ingredients :(' });
//   }
// });

// Rounte to fetch single ingredient 
app.get("/api/ingredients/single/:id", verifyToken, async (req, res) => {
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
app.put("/api/ingredients/:id", verifyToken, async (req, res) => {
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
app.post("/api/ingredients", verifyToken, async (req, res) => {
  const { name, amount, imageURL } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: "Ingredient name is required." });
  }

  const finalAmount = amount && amount.trim() !== '' ? amount : "Out of Stock";
  const userId = req.user.userId;  // Extracting userId from token
  
  try {
    const newIngredient = new Ingredient({
      name,
      amount: finalAmount,
      imageURL: imageURL || '/apple.jpg',
      lastViewed: Date.now(),
      user_id: userId  // Adding the user_id field
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
app.get("/api/ingredients/search", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.user.userId;

    // Get the search query from the URL
    let searchTerms = { $regex: req.query.searchQuery, $options: 'i' };

    let ingredients;
    if (searchTerms !== '') {
      // Filter ingredients by name and user ID
      ingredients = await Ingredient.find({
        name: searchTerms,
        user_id: userId,
      }).sort({ lastViewed: -1 });
    } else {
      // Only retrieve ingredients with the user's ID
      ingredients = await Ingredient.find({ user_id: userId }).sort({ lastViewed: -1 });
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

// Route to fetch recipes based on a query (if empty, it will fetch all recipes)
app.get("/api/recipes/search", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.user.userId;

    let searchTerms = { $regex: req.query.y, $options: 'i' }; // Saves query as a case-insensitive regular expression

    // If the user is filtering by available ingredients
    if (req.query.z == "true") {
      let aIngr = await Ingredient.find({ amount: { $ne: "0" }, user_id: userId }); // Pulls all non-zero ingredients for the current user

      // If searchTerms are present, it pulls recipes filtering by available ingredients and search terms for the current user. If not, it pulls recipes only filtering by available ingredients for the current user.
      if (searchTerms != '') {
        let recipes = await Recipe.find({
          $and: [
            { $or: [{ name: searchTerms }, { desc: searchTerms }, { ingr: searchTerms }] },
            { user_id: userId },
            { ingr: { $in: aIngr.map(ingredient => ingredient._id) } }
          ]
        }).sort({ lastViewed: -1 });
        res.json({ recipes: recipes, status: "All good - recipes received" });
      } else {
        let recipes = await Recipe.find({ ingr: { $in: aIngr.map(ingredient => ingredient._id) }, user_id: userId }).sort({ lastViewed: -1 });
        res.json({ recipes: recipes, status: "All good - recipes received" });
      }
    }

    // If the user is not filtering by available ingredients (works same as above but without ingredients)
    else {
      if (searchTerms != '') {
        let recipes = await Recipe.find({
          $and: [
            { $or: [{ name: searchTerms }, { desc: searchTerms }, { ingr: searchTerms }] },
            { user_id: userId }
          ]
        }).sort({ lastViewed: -1 });
        res.json({ recipes: recipes, status: "All good - recipes received" });
      } else {
        let recipes = await Recipe.find({ user_id: userId }).sort({ lastViewed: -1 });
        res.json({ recipes: recipes, status: "All good - recipes received" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: 'failed to find recipes',
    });
  }
});


// Route to fetch a single recipe
app.get("/api/recipes/single/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id // Saves requested recipe id as a variable for brevity

    const recipe = await Recipe.findById(id) // Pulls recipe by the requested id

    recipe.lastViewed = Date.now() // Updates lastViewed with current date
    await recipe.save() // Updates recipe in database with new lastViewed


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
app.put("/api/recipes/edit/:id", verifyToken, async (req, res) => {
  const id = req.params.id; // the id of the recipe to update
  const { name, img, size, time, desc, ingr, steps } = req.body; // the updated values for the recipe
  // console.log("recieved for edit", id)
  // console.log("changes: ", req.body)

  try {
    const recipe = await Recipe.findById(id) // Find the recipe by ID

    // Update the recipe if field has been updated (not blank)
    if (name) {
      recipe.name = name
    }
    if (img) {
      recipe.img = img
    }
    if (size) {
      recipe.size = size
    }
    if (time) {
      recipe.time = time
    }
    if (desc) {
      recipe.desc = desc
    }
    if (ingr) {
      recipe.ingr = ingr
    }
    if (steps) {
      recipe.steps = steps
    }
    // console.log("new recipe: ", recipe)

    // Write the updated recipes back to the file
    await recipe.save()

    // Send a success response
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
app.post("/api/recipes", verifyToken, async (req, res) => {
  const { name, img, size, time, desc, ingr, steps } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: "Recipe name is required." });
  }

  try {
    const userId = req.user.userId;  // Extracting userId from token

    const newRecipe = new Recipe({
      name,
      img: img || '/pasta.jpg',
      size: parseInt(size, 10),
      time: parseInt(time, 10),
      desc,
      ingr, // Use the passed array
      steps,
      lastViewed:Date.now(),
      user_id: userId,  // Adding the user_id field
    });

    const savedRecipe = await newRecipe.save();
    console.log('New Recipe created with ID:', savedRecipe._id)

    // Send a success response with the new recipe
    res.status(201).json(savedRecipe);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding new recipe" });
  }
});

// export the express app we created to make it available to other modules
module.exports = app
