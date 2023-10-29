import React from "react";
import "./recipe_inventory.css";
import Header from "./header"

{/* Temporary store of recipes for display and testing purposes */}
const TempRecipes = [
    {
        id: '0', name: 'food 1', size: '2', time: '15', desc: 'desc 1'
    },
    {
        id: '1', name: 'food 2', size: '3', time: '30', desc: 'desc 2'
    },
    {
        id: '2', name: 'food 3', size: '50', time: '90', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit magna ut arcu accumsan consequat. Nulla eget mi convallis elit consectetur dignissim at a sapien. Phasellus sed congue arcu. Nulla facilisi. Aliquam erat volutpat. Fusce ut porttitor purus. Quisque rhoncus urna felis, quis posuere orci placerat tristique. Nulla facilisi. Pellentesque rhoncus felis a nisi dictum, ut placerat nisi malesuada. Nullam hendrerit, augue et suscipit ultricies, leo diam consequat mauris, ut sodales nisl magna sit amet erat. In quam nisl, bibendum ac orci et, convallis tincidunt tellus. Donec porta blandit facilisis.'
    }
];

const RecipeInv = props => {
    return (
        <div className = "RECIPE-INV">
            {/*<Header />*/}

            {/* --- SEARCH BAR & FILTERS --- */}
            <div className = "search">
                <div className = "search-bar">
                    <input type="text" placeholder="Search for a recipe" />
                </div>

                <div className = "search-tools">
                    {/* Placeholder for the toggleable filter button */}
                    <div className = "square" />
                    <div className = "filter-text">
                        <p>Filter by available ingredients</p>
                    </div>
                    {/* Placeholder for the search button */}
                    <div className = "search-button">
                        <p>Search</p>
                    </div>
                </div>
            </div>

            {/* --- RECIPE LIST --- */}
            <div className = "recipe-list">
                {/* A function to map an array of recipes */}
                {TempRecipes.map(function(recipe) {
                    return (
                        // Displays each recipe (object) in its own tile
                        <div className = "recipe-tile">
                            {/* Placeholder for the photo */}
                            <div className = "recipe-photo">
                               <p>PLACEHOLDER</p>
                            </div>

                            <div className = "recipe-text">
                                {/* The actual text of the recipe */}
                                {/* Spans exist to change weight of text without weirdness of divs */}
                                <h2>{recipe.name}</h2>
                                <p><span className = "bold">Serves: </span> {recipe.size}</p>
                                <p><span className = "bold">Cooking Time:</span> {recipe.time}</p>
                                <p><span className = "bold">Description:</span></p>
                                <p><span className = "italic">{recipe.desc}</span></p>
                            </div>
                        </div>
                        )
                    })}
            </div>
        </div>
    );
};

export default RecipeInv;