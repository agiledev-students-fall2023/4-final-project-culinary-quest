import React from "react";
import { Link } from "react-router-dom";
import "./IngredientAdd.css";

const IngredientAdd = () => {
    return (
      <div className="ingredient-add">
        <div className="image-section">INGREDIENT IMAGE<br />take a picture / upload a picture</div>

        <label className="input-label">Ingredient Name:</label>

        <div className="input-box">
          <input type="text" placeholder="Enter Ingredient Name Here"/>
        </div>
        <label className="input-label">Ingredient Amount:</label>

        <div className="input-box">
          <input type="text" placeholder="Enter Ingredient Amount Here"/>
        </div>

        <div className="add-button">
          <Link to="/home" className="add">
            Add Ingredient
          </Link>
        </div>
      </div>
      
    );
  };
  export default IngredientAdd;