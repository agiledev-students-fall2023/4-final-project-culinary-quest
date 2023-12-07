import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./home.css";
import { FaArrowRight } from "react-icons/fa";

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `${token}`;
}

const Home = () => {
  const [recentIngredient, setRecentIngredient] = useState(null);
  const [recentRecipe, setRecentRecipe] = useState(null);
  const REACT_APP_SERVER_HOSTNAME = 'https://whale-app-bio98.ondigitalocean.app';

  useEffect(() => {
    // Fetch the ingredients from the backend
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients/search`, { params: { searchQuery: '' } });
        const ingredients = response.data.ingredients;
        // Set the first ingredient as the most recent
        if (ingredients.length > 0) {
          setRecentIngredients(ingredients.slice(0, 2));
        }        
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };

    const fetchRecipes = () => {
      console.log("fetching recipe");
      axios
        .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/search`, { params: { y: '' } })
        .then(response => {
          const recipes = response.data.recipes;
          console.log("resp: ", response.data.recipes);
          console.log("recent rec: ", recipes[0]);

          if (recipes.length > 0) {
            setRecentRecipes(recipes.slice(0, 2));
          }
        })
        .catch(err => {
          console.log("Help 3");
        });
    };

    fetchIngredients();
    fetchRecipes();
  }, []);

  return (
    <div className="HomePage">
      <div className="HomePageContainer">
        <span className="HomeTitle">
          Home
        </span>
        <span className="RecentIngredients">
          Recent Ingredients: 
        </span>
        <div className="ingredientsGrid">
        {recentIngredients.map(ingredient => (
          <Link key={ingredient._id} to={`/ingredients/${ingredient._id}`} className="sampleIngredient">
            <img src={ingredient.imageURL} alt={ingredient.name} />
            <div className="description">
              <h3>{ingredient.name}</h3>
              <p>{ingredient.amount}</p>
            </div>
          </Link>
        ))}
        </div>
        <Link to="/inventory" className="AllIngredients">
          All Ingredients<FaArrowRight className="Arrow"/>
        </Link>
        <div className="AddIngredientButton">
          <Link to="/ingredient-add" className="AddIngredient">
            Add Ingredient
          </Link>
        </div>
        <span className="RecentRecipes">
          Recent Recipes: 
        </span>
        <Link to="/recipe-inventory" className="AllRecipes">
          All Recipes<FaArrowRight className="Arrow"/>
        </Link>

        <div className="recipesGrid">
          {recentRecipes.map(recipe => (
            <Link key={recipe._id} to={`/recipes/single/${recipe._id}`} className="sampleRecipe">
              <img src={recipe.img} alt={recipe.name} />
              <div className="description">
                <h3>{recipe.name}</h3>
                <p>{recipe.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="AddRecipeButton">
          <Link to="/recipe-add" className="AddRecipe">
            Add Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
