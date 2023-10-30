import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IngredientEdit.css";

const IngredientEdit = () => {  {/* will be prefilled with previous recipe infor*/}
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
    const [ingredientName, setIngredientName] = useState("Ingredient Name Here");
    const [ingredientDescription, setIngredientDescription] = useState("Ingredient Amount Here");

    return (
        <div className="ingredient-edit">
            <label className="image-upload-label">
                {imageSrc ? <img src={imageSrc} alt="Uploaded Ingredient" className="uploaded-image"/> : 
                <div className="image-section">INGREDIENT IMAGE<br />take a picture / upload a picture</div>}
                <input type="file" className="image-upload-input" accept="image/*" onChange={handleImageChange} />
            </label>


            <label className="input-label">Ingredient Name:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    value={ingredientName} 
                    onChange={(e) => setIngredientName(e.target.value)}
                />
            </div>

            <label className="input-label">Ingredient Amount:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    value={ingredientDescription} 
                    onChange={(e) => setIngredientDescription(e.target.value)}
                />
            </div>
            
            <Link to="/ingredient" className="add-button">Save Ingredient</Link>  {/* for now home should point to recipe inventory later*/}

        </div>
    );
};

export default IngredientEdit;