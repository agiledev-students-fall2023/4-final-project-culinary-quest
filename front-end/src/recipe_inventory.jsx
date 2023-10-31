import React from "react";
import "./ingredient_inventory.css";

const RecipeInv = () => {
  return (
    <div className="container">
      <h1>Your Recipes</h1>
      <div className="spacer"></div>
      <div className="columns">
        {Array(3).fill(null).map((_, index) => (
          <div key={index} className="column">
            <a href="/recipe"> {/* <-- Add this line */}
              <img src="https://shorturl.at/gHJ89" alt="Recipe Image" />
              <div className="ingredient-description">
                <h3>Recipe Name</h3>
                <p>Description here</p>
              </div>
            </a> {/* <-- Add this line */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInv;
