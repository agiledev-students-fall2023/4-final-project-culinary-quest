import React from "react";
import { Link } from "react-router-dom";
import "./indiv_recipe.css";

const IndivRecipe = () => {

    return (
        <div className="recipe-view">

            <label className="title-label">[Recipe Name]</label>

            <div className="image-section">RECIPE IMAGE<br /></div>

            <label className="text-label">Recipe Description:</label>
            <label className="text-box">[Recipe Description Here]</label>

            <label className="text-label">Recipe Steps:</label>
            <label className="text-box">[Recipe Steps Here]</label>

            <div className="button-container">
                <Link to="/recipe-edit" className="button">Edit Recipe</Link>
<<<<<<< HEAD
                <Link to="/recipe-inventory" className="button">Return to Recipe Inventory</Link>
=======

                <Link to="/recipe-inventory" className="button">Return to Recipe Inventory</Link> {/* for now home should point to recipe inventory later*/}
>>>>>>> origin/petra
            </div>
        </div>
    );
};

export default IndivRecipe;

