import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [recentIngredient, setRecentIngredient] = useState(null);
  const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';

  useEffect(() => {
    // Fetch the ingredients from the backend
    const fetchIngredients = async () => {
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

    fetchIngredients();
  }, []);

  return (
    <div className="HomePage">
      <div className="HomePageContainer">
        <span className="HomeTitle">
          Home
        </span>
        <div className="SearchBar">
          <input type="text" placeholder="Search ingredients or recipes"/>
        </div>
        <div className="SearchButton">
          <Link to="/inventory" className="Search">
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </div>
        <span className="RecentIngredients">
          Recent Ingredients: 
        </span>
        {recentIngredient && (
          <Link to={`/ingredients/${recentIngredient.id}`} className="sampleIngredient">
            <img src={recentIngredient.imageURL} alt="Image" />
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
        <Link to="/recipe" className="sampleRecipe">
          <img src="https://shorturl.at/gHJ89" alt="Image" />
          <div className="description">
            <h3>Recipe Name</h3>
            <p>Description here</p>
          </div>
        </Link>
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
