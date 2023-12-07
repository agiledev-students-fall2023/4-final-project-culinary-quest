import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./indiv_recipe.css";
import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * A React component that represents one recipe in the list of recipes.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const IndivRecipe = (props)  => {
    const [recipe, setRecipe] = useState([])
    const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;

    // const loc = useLocation()
    const { id } = useParams()
    // const selectedRecipe = loc.state?.x
    console.log(`selected: ${id}`)

    const fetchRecipe = () => {
        axios
            .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/single/${id}`)
            .then(response => {
                const indivRecipe = response.data.recipe
                setRecipe(indivRecipe)
                console.log(indivRecipe)
            })
            .catch(err => {
                console.log("error getting recipe", err)
            })
    }

    useEffect(() => {
        // console.log("here1 ",selectedRecipe)
        fetchRecipe()
        return e => {
            console.log("done")
            console.log(recipe)
        }
    }, [id])

    return (
        <div classname="container">
        <div className="recipe-view">
            <h1>View Recipe</h1>
            <label className="title-label">{recipe.name}</label>

            <div className="image-section-recipe">
                <img src = {recipe.img} alt = {recipe.name} /><br />
            </div>

            <label className="text-label">Recipe Description:</label>
            <label className="text-box">{recipe.desc}</label>

            <label className="text-label">Recipe Ingredients:</label>
            <div className="text-box-ingredients">
                {recipe.ingr && recipe.ingr.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                ))}
            </div>

            <label className="text-label">Recipe Steps:</label>
            <div className="text-box-recipesteps">
                {recipe.steps && recipe.steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div>{step}</div>
                    <div>&nbsp;</div> {/* Empty row */}
                </React.Fragment>
                ))}
            </div>


            <div className="button-container">
                <Link to={`/recipe-edit/${recipe._id}`} className="button">Edit Recipe</Link>

                <Link to="/recipe-inventory" className="button">Recipe Inventory</Link> {/* for now home should point to recipe inventory later*/}
            </div>
        </div>
        </div>
    );
};

export default IndivRecipe;

