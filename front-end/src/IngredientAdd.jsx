import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IngredientAdd.css";

const IngredientAdd = () => {
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
        <div className="ingredient-add">
            <label className="image-upload-label">
                {imageSrc ? <img src={imageSrc} alt="Uploaded Ingredient" className="uploaded-image"/> : 
                <div className="image-section">INGREDIENT IMAGE<br />take a picture / upload a picture</div>}
                <input type="file" className="image-upload-input" accept="image/*" onChange={handleImageChange} />
            </label>
            <label className="input-label">Ingredient Name:</label>
            <div className="input-box">
                <input type="text" placeholder="Enter Ingredient Name Here"/>
            </div>
            
            <label className="input-label">Ingredient Amount:</label>
            <div className="input-box">
                <input type="text" placeholder="Enter Ingredient Amount Here"/>
            </div>

            <div className="add-button">
                <Link to="/inventory" className="add">Add Ingredient</Link>
            </div>
        </div>
    );
};

export default IngredientAdd;
