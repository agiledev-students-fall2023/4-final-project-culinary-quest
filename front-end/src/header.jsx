import React, {useState} from "react";
import "./header.css";

const Header = props => {
  return (
    <div className="Header">  
      <button className="MenuButton" onClick={() => props.activateMenu(!props.menuState)}>
        <div className="MenuLine"></div>
        <div className="MenuLine"></div>
        <div className="MenuLine"></div>
      </button>
      <a href="/login" className="LogoButton" />
    </div>
  );
};

export default Header;
