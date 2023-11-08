import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Ingredient.css";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Ingredient = () => {
    const [ingredient, setIngredient] = useState(null);
    const { id } = useParams(); // This hooks give you access to the `id` in the URL
    const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';
  
    useEffect(() => {
      axios
        .get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients/${id}`) // Your API route should support fetching by ID
        .then(response => {
          setIngredient(response.data); // Assuming the backend sends the ingredient object directly
        })
        .catch(err => {
          console.error("Failed to fetch ingredient:", err);
        });
    }, [id]); // Rerun the effect if the ID changes
  
    // Add a loading state or conditionally render below if ingredient is null
    return ingredient ? (
      <div className="ingredient-view">
        <label className="title-label">{ingredient.name}</label>
        <div className="image-section">
          <img src={ingredient.imageURL} alt={ingredient.name} /><br />
        </div>
        <label className="text-label">Ingredient Amount:</label>
        <label className="text-box">{ingredient.amount}</label>
        <div className="button-container">
            <Link to="/ingredient-edit" className="button">Edit Ingredient</Link>

            <Link to="/inventory" className="button">Return to Ingredient Inventory</Link> 
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  };
  
export default Ingredient;
