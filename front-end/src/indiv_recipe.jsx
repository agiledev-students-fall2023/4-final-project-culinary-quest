import React from "react";
import "./indiv_recipe.css";
import Header from "./header"

const IndivRecipe = props => {
    return (
        <div className = "INDIV-RECIPE">
            {/*<Header />*/}

            {/* Displays the recipe name and photo ontop of each other */}
            <div className = "name">
                <h1>[Recipe Name]</h1>
            </div>

            <div className = "photo">
                <p>RECIPE PHOTO</p>
            </div>

            {/* Main recipe text is kept in a separate div one ontop of the other */}
            <div className = "recipe-text">
                {/* Separate class to allow for italics and different font color/size */}
                <div className = "description">
                    <p>[Description]</p>
                </div>

                {/* Main ingredient list and steps can be displayed using standard text/article formating */}
                <div className = "main-text">
                    <h2>Ingredients</h2>
                    <p>[Ingredients]</p>
                    <br />

                    <h2>Steps</h2>
                    <p>[Steps]</p>
                </div>
            </div>
            
            {/* Button to return to recipe inventory -- CURRENTLY A NON-FUNCTIONAL PLACEHOLDER */}
            <div className = "button">
                <p>Return to Recipes</p>
            </div>

        </div>
    );
}

export default IndivRecipe;