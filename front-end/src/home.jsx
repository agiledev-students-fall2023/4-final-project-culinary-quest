import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
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
        <Link to="/ingredient" className="sampleIngredient">
          <img src="https://shorturl.at/gHJ89" alt="Image" />
          <div className="description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </Link>
        <Link to="/inventory" className="AllIngredients">
          All Ingredients<FaArrowRight className="Arrow"/>
        </Link>
        <div className="AddIngredientButton">
          <Link to="/ingredient" className="AddIngredient">
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
