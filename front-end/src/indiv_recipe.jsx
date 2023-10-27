import React from "react";
import "./indiv_recipe.css";
import Header from "./header"

const IndivRecipe = props => {
    return (
        <div className = "INDIV-RECIPE">
            {/*<Header />*/}
            <div className = "name">
                <h1>[Recipe Name]</h1>
            </div>

            <div className = "photo">
                <p>RECIPE PHOTO</p>
            </div>

            <div className = "recipe-text">
                <div className = "description">
                    <p>[Description]</p>
                </div>

                <div className = "main-text">
                    <h2>Ingredients</h2>
                    <p>[Ingredients]</p>
                    <br />

                    <h2>Steps</h2>
                    <p>[Steps]</p>
                </div>
            </div>

            <div className = "button">
                <p>Return to Recipes</p>
            </div>

        </div>
    );
}

export default IndivRecipe;