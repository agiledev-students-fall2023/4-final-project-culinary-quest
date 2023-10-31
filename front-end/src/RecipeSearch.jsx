import React from "react";
import { Link } from "react-router-dom";
import "./RecipeSearch.css";

const RecipeSearch = () => {
  return (
    <div className="index">

      <label className="title-label">Recipe Search</label>

      <div className="search-bar">
        <input className="search-text" type="text" placeholder="Search" />
        <Link to="/recipe-search"className="button-search">Search</Link>
      </div>
      <div className="columns">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="column">
            <a href="/recipe"> 
              <img src="https://shorturl.at/gHJ89" alt="Recipe" />
              <div className="recipe-description">
                <h3>Recipe Name</h3>
                <p>Description here</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;

