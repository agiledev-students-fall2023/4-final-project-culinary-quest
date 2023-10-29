import React from "react";
import "./recipe_inventory.css";
import Header from "./header"

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

            {/* --- SEARCH BAR & FILTERS--- */}
            <div className = "search"> {/* Should be a column flexbox */}
                <div className = "search-bar">
                    <input type="text" placeholder="Search for a recipe" />
                </div>

                <div className = "search-tools"> {/* Should be a row flexbox (row of elements) */}
                    <div className = "square" /> {/* The filter toggle button */}
                    <div className = "filter-text">
                        <p>Filter by available ingredients</p> {/* The text next to the filter toggle button */}
                    </div>
                    <div className = "search-button"> {/* Search button placeholder */}
                        <p>Search</p>
                    </div>
                </div>
            </div>

            {/* --- RECIPE LIST --- */}
            <div className = "recipe-list"> {/* Should be a column flexbox */}
                {TempRecipes.map(function(recipe) {
                    return (
                        <div className = "recipe-tile">
                            <div className = "recipe-photo">
                               <p>PLACEHOLDER</p>
                            </div>
                            <div className = "recipe-text">
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