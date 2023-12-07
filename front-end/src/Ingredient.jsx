import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import "./Ingredient.css";

const Ingredient = () => {
    const [ingredient, setIngredient] = useState(null);
    const { id } = useParams(); // This hook gives us access to the `id` in the URL
    const location = useLocation(); // Access the state passed during navigation
    const REACT_APP_SERVER_HOSTNAME = 'https://whale-app-bio98.ondigitalocean.app';
    const justUpdated = useRef(false); // useRef to track if the ingredient was just updated

    // Effect to set the ref when the component is navigated to after an update
    useEffect(() => {
        if (location.state?.updated) {
            justUpdated.current = true; // Mark that an update has occurred
        }
    }, [location]);

    // Effect to fetch ingredient data
    useEffect(() => {
        const fetchIngredient = () => {
            axios
                .get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients/single/${id}`)
                .then(response => {
                    setIngredient(response.data); // Update the ingredient state
                    if (justUpdated.current) {
                        justUpdated.current = false; // Reset the ref after fetching
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch ingredient:", err);
                });
        };

        fetchIngredient();
    }, [id, justUpdated.current]); // Depend on justUpdated.current to trigger refetching
  
    return ingredient ? (
      <div className="ingredient-view">
        <h1>View Ingredient</h1>
        <label className="title-label">{ingredient.name}</label>
        <div className="image-section-ingredient">
          <img src={ingredient.imageURL} alt={ingredient.name} /><br />
        </div>
        <label className="text-label">Ingredient Amount:</label>
        <label className="text-box">{ingredient.amount}</label>
        <div className="button-container">
            <Link to={`/ingredient-edit/${id}`} className="button">Edit Ingredient</Link>
            <Link to="/inventory" className="button">Ingredient Inventory</Link> 
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
};
  
export default Ingredient;
