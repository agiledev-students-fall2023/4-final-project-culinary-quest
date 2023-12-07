import React from "react";
import "./ingredient_inventory.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Ingredient_Inventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState("");
  const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;

  const fetchIngredients = (props) => {
    axios
      .get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients/search`, { params: { searchQuery: search }})
      .then((response) => {
        // handle the filtered ingredients
        setIngredients(response.data.ingredients);
      })
      .catch((err) => {
        console.error("Failed to fetch ingredients:", err);
      });
  };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearchClick = () => {
  //   fetchIngredients(searchQuery);
  // };

  useEffect(() => {
    // Initial fetch
    fetchIngredients();
  }, [search]);

  return (
    <div className="container-ing-inv">
      <h1>Your Ingredients</h1>
      <div className="ingredient-inventory"></div>
      <div className="search-bar-container-ing">
        <input
          className="search-input-ing"
          type="text"
          placeholder="Search for an ingredient"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/ingredient-add" >
          <button className="add-ing-btn">+</button>
        </Link>
        {/* <button className="submit-button" onClick={handleSearchClick}>
          Search
        </button> */}
      </div>

      <div className="columns_ing">
        {ingredients.map((ingredient) => (
          <div className="column_ing" key={ingredient._id}>
            <Link to={`/ingredients/${ingredient._id}`}>
              <img src={ingredient.imageURL} alt={ingredient.name} />
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
