import React, { useState } from "react";
import "./burger.css";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

const Burger = (props) => {
  // Only displays sidebar if page state is 1; state is passed down from parent component (usually the header)
  // At the moment, the parent is RecipeInv for testing purposes
  if (props.menuState == 1) {
    return (
      <aside className="SIDEBAR">
        <div className="bar">
          <Link
            to="/settings"
            className="Search"
            onClick={() => props.activateMenu(!props.menuState)}
          />
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
