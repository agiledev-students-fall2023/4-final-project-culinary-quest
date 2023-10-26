import React from "react";
import { Hamburger } from "../../components/Hamburger";
import { LogoButton } from "../../components/LogoButton";
import "./style.css";

export const Index = () => {
  return (
    <div className="index">
      <div className="div">
        <div className="overlap">
          <div className="text-wrapper-2">[INGREDIENT NAME]</div>
        </div>
        <button className="frame">
          <button className="submit-button">
            <div className="overlap-group">
              <div className="submit-button-2" />
              <div className="text-wrapper-3">Search</div>
            </div>
          </button>
        </button>
        <div className="overlap-2">
          <div className="ingredient-inventory">
            <div className="ingredients">
              <div className="rectangle" />
              <div className="INGREDIENT-NAME">
                INGREDIENT NAME
                <br />
                <br />
                description here
              </div>
            </div>
            <div className="ingredients-2">
              <div className="rectangle" />
              <div className="INGREDIENT-NAME">
                INGREDIENT NAME
                <br />
                <br />
                description here
              </div>
              <div className="ingredients-3">
                <div className="rectangle" />
                <div className="INGREDIENT-NAME">
                  INGREDIENT NAME
                  <br />
                  <br />
                  description here
                </div>
              </div>
            </div>
            <div className="ingredients-4">
              <div className="rectangle" />
              <div className="INGREDIENT-NAME">
                INGREDIENT NAME
                <br />
                <br />
                description here
              </div>
              <div className="ingredients-3">
                <div className="rectangle" />
                <div className="INGREDIENT-NAME">
                  INGREDIENT NAME
                  <br />
                  <br />
                  description here
                </div>
              </div>
            </div>
          </div>
          <div className="INGREDIENT-NAME-2">
            INGREDIENT NAME
            <br />
            <br />
            description here
          </div>
        </div>
        <Hamburger className="hamburger-instance" />
        <LogoButton className="logo-button-instance" />
      </div>
    </div>
  );
};
