import React from "react";
import "./ingredient_inventory.css";

export const Ingredient_Inventory = () => {
  return (
    <div className="index">
        <h1>YOUR INGREDIENTS</h1>
      <div className="columns">
        <div className="column">
          <img src="image_url" alt="Ingredient Image" />
          <div className="ingredient-description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </div>
        <div className="column">
          <img src="image_url" alt="Ingredient Image" />
          <div className="ingredient-description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </div>
        <div className="column">
          <img src="image_url" alt="Ingredient Image" />
          <div className="ingredient-description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Ingredient_Inventory;