import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="Header">  
      <a href="/burger" className="MenuButton">
        <div className="MenuLine"></div>
        <div className="MenuLine"></div>
        <div className="MenuLine"></div>
      </a>
      <a href="/home" className="LogoButton" />
    </div>
  );
};

export default Header;
