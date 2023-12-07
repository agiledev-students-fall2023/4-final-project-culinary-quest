import React, { useState } from "react";
import "./burger.css";
import { Link } from "react-router-dom";

const Burger = (props) => {
  // Only displays sidebar if page state is 1; state is passed down from parent component (usually the header)
  // At the moment, the parent is RecipeInv for testing purposes
  if (props.menuState == 1) {
    return (
      <aside className="SIDEBAR">
        <div className="bar">
          {/* <div className = "profile">
            <div className = "profile-pic" />
            <p>Welcome!</p>
          </div> */}
          <div className = "buttons">
            {/* Home button  */}
            <Link
              to="/home"
              className="button"
              onClick={() => props.activateMenu(!props.menuState)}
            >
              Home
            </Link>

            {/* Ingredients button */}
            <Link
              to="/inventory"
              className="button"
              onClick={() => props.activateMenu(!props.menuState)}
            >
              Ingredients
            </Link>

            {/* Recipes button */}
            <Link
              to="/recipe-inventory"
              className="button"
              onClick={() => props.activateMenu(!props.menuState)}
            >
              Recipes
            </Link>

            {/* Settings button */}
            <Link
              to="/settings"
              className="button"
              onClick={() => props.activateMenu(!props.menuState)}
            >
              Settings
            </Link>
          </div>
        </div>
        <div
          className="overlay"
          onClick={() => props.activateMenu(!props.menuState)}
        />
      </aside>
    );
  }
};

export default Burger;