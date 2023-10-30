import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeAdd.css";

const RecipeAdd = () => {
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

    return (
        <div className="recipe-add">
            <label className="image-upload-label">
                {imageSrc ? <img src={imageSrc} alt="Uploaded Recipe" className="uploaded-image"/> : 
                <div className="image-section">RECIPE IMAGE<br />take a picture / upload a picture</div>}
                <input type="file" className="image-upload-input" accept="image/*" onChange={handleImageChange} />
            </label>


            <label className="input-label">Recipe Name:</label>
            <div className="input-box">
                <input type="text" placeholder="Enter Recipe Name Here"/>
            </div>

            <label className="input-label">Recipe Description:</label>
            <div className="input-box">
                <input type="text" placeholder="Enter Recipe Description Here"/>
            </div>
            
            <label className="input-label">Recipe Steps:</label>
            <div className="input-box">
                <input type="text" placeholder="Enter Ingredient Steps Here"/>
            </div>

            <Link to="/home" className="add-button">Add Recipe</Link>  {/* for now home should point to recipe inventory later*/}
        </div>
    );
};

export default RecipeAdd;
