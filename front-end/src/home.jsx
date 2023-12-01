import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [recentIngredient, setRecentIngredient] = useState(null);
  const [recentRecipe, setRecentRecipe] = useState(null);
  const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';

  useEffect(() => {
    // Fetch the ingredients from the backend
    const fetchIngredients = async () => {
      console.log("h1")
      try {
        const response = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients`);
        const ingredients = response.data.ingredients;
        // Set the first ingredient as the most recent
        if (ingredients.length > 0) {
          setRecentIngredient(ingredients[0]);
        }
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };

    const fetchRecipes = () => {
      console.log("fetching recipe")
      axios
        .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/search`, {params: {y: ''}})
        .then(response => {
          const recipes = response.data.recipes
          console.log("resp: ", response.data.recipes)
          console.log("recent rec: ", recipes[0] )
          
          if (recipes.length > 0) {
            setRecentRecipe(recipes[0])
          }
        })
        .catch(err => {
          console.log("Help 3")
        })
  }

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
        {recentIngredient && (
          <Link to={`/ingredients/${recentIngredient._id}`} className="sampleIngredient">
            <img src={recentIngredient.imageURL} alt={recentIngredient.name} />
            <div className="description">
              <h3>{recentIngredient.name}</h3>
              <p>{recentIngredient.amount}</p>
            </div>
          </Link>
        )}
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

        <div className = "recipeTile">
          {recentRecipe && (<Link to={`/recipes/single/${recentRecipe._id}`} className="sampleRecipe">
            <img src={recentRecipe.img} alt={recentRecipe.name} />
            <div className="description">
              <h3>{recentRecipe.name}</h3>
              <p>{recentRecipe.desc}</p>
            </div>
          </Link>
          )}
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
