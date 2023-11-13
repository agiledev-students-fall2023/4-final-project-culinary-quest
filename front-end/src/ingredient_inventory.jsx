import React from "react";
import "./ingredient_inventory.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Ingredient_Inventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';

  const [searchQuery, setSearchQuery] = useState("");

  const fetchIngredients = (query = "") => {
    axios
      .get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients`, {
        params: { searchQuery: query },
      })
      .then((response) => {
        // handle the filtered ingredients
        setIngredients(response.data.ingredients);
      })
      .catch((err) => {
        console.error("Failed to fetch ingredients:", err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    fetchIngredients(searchQuery);
  };

  useEffect(() => {
    // Initial fetch
    fetchIngredients();
  }, []);

  return (
    <div className="container">
      <h1>Your Ingredients</h1>
      <div className="spacer"></div>
      <div className="search-bar">
        <input
          className="search-text"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="submit-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <div className="columns">
        {ingredients.map((ingredient) => (
          <div className="column" key={ingredient.id}>
            <Link to={`/ingredients/${ingredient.id}`}>
              <img src={ingredient.imageURL} alt="Ingredient" />
              <div className="ingredient-description">
                <h3>{ingredient.name}</h3>
                <p>{ingredient.amount}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredient_Inventory;
