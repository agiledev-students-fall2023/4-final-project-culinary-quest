import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./IngredientAdd.css";

const IngredientAdd = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();
    const REACT_APP_SERVER_HOSTNAME = 'https://whale-app-bio98.ondigitalocean.app';

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

    const handleAddIngredient = async () => {
        if (name.trim() === '') {
            alert('Ingredient name is required.');
            return;
        }

        const finalAmount = amount.trim() === '' ? "Out of Stock" : amount;
        const finalImageSrc = imageSrc || '/apple.jpg';

        try {
            const response = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/ingredients`, {
                name,
                amount: finalAmount,
                imageURL: finalImageSrc
            });
            console.log(response.data); // Log the newly added ingredient
            navigate('/inventory'); // Redirect to the inventory page
        } catch (error) {
            console.error('Failed to add ingredient:', error);
        }
    };

    return (
        <div className="ingredient-add">
            <h1>ADD INGREDIENT</h1>
            <label className="image-upload-label">
                {imageSrc ? <img src={imageSrc} alt="Uploaded Ingredient" className="uploaded-image"/> : 
                <div className="image-section">INGREDIENT IMAGE<br />Upload or take a picture</div>}
                <input type="file" className="image-upload-input" accept="image/*" capture onChange={handleImageChange} />
            </label>
            
            <label className="input-label">Ingredient Name:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    placeholder="Enter Ingredient Name Here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            
            <label className="input-label">Ingredient Amount:</label>
            <div className="input-box">
                <input 
                    type="text" 
                    placeholder="Enter Ingredient Amount Here"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <button 
                onClick={handleAddIngredient} 
                className="add-button"
                
            >
                Add Ingredient
            
            </button>
        </div>
    );
};

export default IngredientAdd;
