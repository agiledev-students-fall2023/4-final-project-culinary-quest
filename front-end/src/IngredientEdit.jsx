import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./IngredientEdit.css";

const IngredientEdit = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState("");
    const { id } = useParams(); // This hooks gives us access to the `id` in the URL
    const navigate = useNavigate(); // Hook to navigate to different routes

    useEffect(() => {
      const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';
      axios
        .get(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients/${id}`)
        .then(response => {
          const ingredient = response.data;
          setIngredientName(ingredient.name);
          setIngredientAmount(ingredient.amount);
          setImageSrc(ingredient.imageURL);
        })
        .catch(err => {
          console.error("Failed to fetch ingredient:", err);
        });
    }, [id]);

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

    const handleSave = () => {
        const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';
        axios
            .put(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients/${id}`, {
                name: ingredientName,
                amount: ingredientAmount,
                imageURL: imageSrc
            })
            .then(response => {
                navigate(`/ingredients/${id}`, { state: { updated: true } });
            })
            .catch(err => {
                console.error("Failed to save ingredient:", err);
            });
    };
    

    return (
        <div className="ingredient-edit">
            <label className="image-upload-label">
                {imageSrc ? <img src={imageSrc} alt="Ingredient" className="uploaded-image"/> : 
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
                    value={ingredientAmount} 
                    onChange={(e) => setIngredientAmount(e.target.value)}
                />
            </div>
            
            {/* Use an onClick handler to save the ingredient */}
            <button onClick={handleSave} className="save-button">Save Ingredient</button>  
        </div>
    );
};

export default IngredientEdit;