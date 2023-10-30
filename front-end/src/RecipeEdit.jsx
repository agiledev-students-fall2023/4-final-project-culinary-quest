import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeEdit.css";

const RecipeEdit = () => {  {/* will be prefilled with previous recipe infor*/}
    const [imageSrc, setImageSrc] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [recipeName, setRecipeName] = useState("Recipe Name Here");
    const [recipeDescription, setRecipeDescription] = useState("Recipe Description Here");
    const [recipeSteps, setRecipeSteps] = useState("Ingredient Steps Here");


    return (
        <div className="recipe-edit">
            <label className="image-upload-label">
                {imageSrc ? <img src={imageSrc} alt="Uploaded Recipe" className="uploaded-image"/> : 
                <div className="image-section">RECIPE IMAGE<br />take a picture / upload a picture</div>}
                <input type="file" className="image-upload-input" accept="image/*" onChange={handleImageChange} />
            </label>


            <label className="input-label">Recipe Name:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    value={recipeName} 
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </div>

            <label className="input-label">Recipe Description:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    value={recipeDescription} 
                    onChange={(e) => setRecipeDescription(e.target.value)}
                />
            </div>

            <label className="input-label">Recipe Steps:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    value={recipeSteps} 
                    onChange={(e) => setRecipeSteps(e.target.value)}
                />
            </div>

            
            <Link to="/recipe" className="add-button">Save Recipe</Link>  {/* for now home should point to recipe inventory later*/}

        </div>
    );
};

export default RecipeEdit;