import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Ingredient.css";

const Ingredient = () => {

    return (
        <div className="ingredient-view">

            <label className="title-label">[Ingredient Name]</label>

            <div className="image-section">INGREDIENT IMAGE<br /></div>

            <label className="text-label">Ingredient Amount:</label>
            <label className="text-box">[Recipe Description Here]</label>

            <div className="button-container">
                <Link to="/ingredient-edit" className="button">Edit Ingredient</Link>

                <Link to="/inventory" className="button">Return to Ingredient Inventory</Link> 
            </div>
        </div>
    );
};

export default Ingredient;
