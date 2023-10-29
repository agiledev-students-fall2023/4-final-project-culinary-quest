import React, { useState } from 'react';
import "./header.css";
import Burger from "./burger";

const Header = props => {
  return (
    <div className="header">
      <div className="full-header">
        <div className="hamburger-button">
          <button onClick = {() => props.activateMenu(!props.menuState)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
        </div>
        <img className="LOGO-SPACE" alt="Logo SPACE" src="LOGO-SPACE.png" />
      </div>
    </div>
  );
};

export default Header;
