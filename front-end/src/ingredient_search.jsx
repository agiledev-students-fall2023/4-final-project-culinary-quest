import React from "react";
import "./ingredient_search.css";

const Ingredient_Search = () => {
  return (
    <div className="index">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="submit-button">Search</button>
      </div>
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
        
      </div>
    </div>
  );
};

export default Ingredient_Search;
