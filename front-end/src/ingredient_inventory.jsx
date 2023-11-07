import React from "react";
import "./ingredient_inventory.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ingredient_Inventory = () => {

  const [ingredients, setIngredients] = useState([]); // State to store ingredients
  const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';

  // Fetch ingredients from the backend
  const fetchIngredients = () => {
    axios
      .get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients`)
      .then(response => {
        // Assuming the backend sends the ingredients array in response.data.ingredients
        setIngredients(response.data.ingredients);
      })
      .catch(err => {
        console.error("Failed to fetch ingredients:", err);
      });
  };

  // Use useEffect to call fetchIngredients when the component mounts
  useEffect(() => {
    fetchIngredients();
  }, []); // Empty array as second argument to only run once on mount
  

  return (
    <div className="container">
      <h1>Your Ingredients</h1>
      <div className="spacer"></div>
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
