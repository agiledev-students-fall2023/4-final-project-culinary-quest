import React from "react";
import "./ingredient_inventory.css";

const Ingredient_Inventory = () => {
  return (
    <div className="container">
      <h1>Your Ingredients</h1>
      <div className="spacer"></div>
      <div className="columns">
        <div className="column">
          <img src="https://shorturl.at/gHJ89" alt="Ingredient Image" />
          <div className="ingredient-description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </div>
        <div className="column">
          <img src="https://shorturl.at/gHJ89" alt="Ingredient Image" />
          <div className="ingredient-description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </div>
        <div className="column">
          <img src="https://shorturl.at/gHJ89" alt="Ingredient Image" />
          <div className="ingredient-description">
            <h3>Ingredient Name</h3>
            <p>Description here</p>
          </div>
        </div>
        <div className="column">
          <img src="https://shorturl.at/gHJ89" alt="Ingredient Image" />
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
