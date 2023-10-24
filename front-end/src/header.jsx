import React from "react";
import "./style.css";

const Header = props => {
  return (
    <div className="header">
      <div className="full-header">
        <div className="hamburger-button">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <img className="LOGO-SPACE" alt="Logo SPACE" src="LOGO-SPACE.png" />
      </div>
    </div>
  );
};

export default Header;
