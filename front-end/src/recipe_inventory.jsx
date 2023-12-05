import React from 'react';
import { useState, useEffect } from 'react';
import "./recipe_inventory.css";
import axios from 'axios';

import { Link } from "react-router-dom";

const RecipeInv = props => {
    const [recipes, setRecipes] = useState([])
    const [search, setSearch] = useState("")
    const [toggle, setToggle] = useState(false)
    const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001'

    const searchRecipes = (props) => {
        // console.log(search)
        axios
            .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/search`, { params: {y: search, z: toggle}})
            .then(response => {
                console.log("successfully contacted back end")
                setRecipes(response.data.recipes)
            })
            .catch(err => {
                console.log("error: failed to contact back end")
            })
    }

    // useEffect to update recipes shown after filtering -- it only activates upon the search button being clicked
    useEffect(() => {
        searchRecipes()
        return e => {
            console.log("done")
        }
    }, [search, toggle])
    
    // ##################################################################################################

    return (
        <div className = "container"> 
        <div className = "RECIPE-INV">
            <h1>Your Recipes</h1>

            {/* --- SEARCH BAR & FILTERS --- */}
            <div className = "search">
                <input 
                    type="text" 
                    placeholder="Search for a recipe" 
                    value = {search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className = "search-tools">
                    {toggle === true ?
                    <button className = "square-on" onClick = {() => setToggle(!toggle)}/> :
                    <button className = "square-off" onClick = {() => setToggle(!toggle)}/>
                    }
                    <div className = "filter-text">
                        <p>Filter by available ingredients</p>
                    </div>
                </div>
            </div>
            </div>

            {/* --- RECIPE LIST --- */}
            <div className = "columns_ing">
                {/* A function to map an array of recipes */}
                {recipes.map(function(recipe) {
                    return (
                        <div className="columns_ing">
                            <div className="column_rec">
                        <li key={recipe._id}>
                            {/* Displays each recipe (object) in its own tile */}
                            <Link 
                                className = "recipe-tile" 
                                to = {`/recipes/single/${recipe._id}`}
                                // state = {{x: recipe._id}}
                            >
                                {/* Placeholder for the photo */}
                                <div className = "recipe-photo">
                                    <img src = {recipe.img} alt = {recipe.name} />
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
                            </Link>
                        </li>
                        </div>
                        </div>
                        )
                    })}
            </div>
        </div>
    );
};

export default RecipeInv;