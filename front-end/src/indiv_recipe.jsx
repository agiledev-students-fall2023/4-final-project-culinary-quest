import React from "react";
import { Link, useLocation } from "react-router-dom";
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
    const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001'

    const loc = useLocation()
    const selectedRecipe = loc.state?.x
    console.log(`selected: ${selectedRecipe}`)

    const fetchRecipe = () => {
        axios
            .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/${selectedRecipe}`, { params: {y: selectedRecipe}})
            .then(response => {
                const indivRecipe = response.data.recipe
                setRecipe(indivRecipe)
            })
            .catch(err => {
                console.log("error getting recipe")
            })
    }

    useEffect(() => {
        fetchRecipe()
        return e => {
            console.log("done")
        }
    }, [])

    return (
        <div className="recipe-view">
            <label className="title-label">{recipe.name}</label>

            <div className="image-section">[recipe.img]<br /></div>

            <label className="text-label">Recipe Description:</label>
            <label className="text-box">[Recipe Description Here]</label>

            <label className="text-label">Recipe Steps:</label>
            <label className="text-box">[Recipe Steps Here]</label>

            <div className="button-container">
                <Link to="/recipe-edit" className="button">Edit Recipe</Link>

                <Link to="/recipe-inventory" className="button">Return to Recipe Inventory</Link> {/* for now home should point to recipe inventory later*/}
            </div>
        </div>
    );
};

export default IndivRecipe;

