import React from "react";
import "./recipe_inventory.css";
import Header from "./header"

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
                <p>[PLACEHOLDER]</p>
            </div>
        </div>
    );
};

export default RecipeInv;