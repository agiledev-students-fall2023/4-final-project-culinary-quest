import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecipeAdd.css';

const RecipeAdd = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [size, setSize] = useState('');
  const [ingr, setIngr] = useState('');
  const [steps, setSteps] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();
  const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';

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

  const handleAddRecipe = async () => {
    if (!name.trim() || !desc.trim() || !time.trim() || !size.trim() || !ingr.trim() || !steps.trim()) {
      alert('All fields are required.');
      return;
    }

    const finalImageSrc = imageSrc || '/apple.jpg';
    const ingredientsArray = ingr.split(',').map(ingredient => ingredient.trim());


    try {
        const response = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/recipes`, {
        name,
        img: finalImageSrc,
        size: parseInt(size, 10),
        time: parseInt(time, 10),
        desc,
        ingr: ingredientsArray,
        steps,
        lastViewed: Date.now(),
      });
      console.log(response.data);
      navigate('/recipe-inventory');
    } catch (error) {
      console.error('Failed to add recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="recipe-add">
      <label className="image-upload-label">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded Recipe" className="uploaded-image" />
        ) : (
          <div className="image-section">
            RECIPE IMAGE
            <br />
            take a picture / upload a picture
          </div>
        )}
        <input type="file" className="image-upload-input" accept="image/*" onChange={handleImageChange} />
      </label>

      <label className="input-label">Recipe Name:</label>
      <div className="input-box">
        <input type="text" placeholder="Enter Recipe Name Here" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <label className="input-label">Recipe Description:</label>
      <div className="input-box">
        <input type="text" placeholder="Enter Recipe Description Here" value={desc} onChange={(e) => setDesc(e.target.value)} required />
      </div>

      <label className="input-label">Preparation Time (in minutes):</label>
      <div className="input-box">
        <input type="number" placeholder="Enter Preparation Time Here" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <label className="input-label">Serving Size:</label>
      <div className="input-box">
        <input type="number" placeholder="Enter Serving Size Here" value={size} onChange={(e) => setSize(e.target.value)} required />
      </div>

      <label className="input-label">Ingredients (comma separated):</label>
      <div className="input-box">
        <input type="text" placeholder="Enter Ingredients Here" value={ingr} onChange={(e) => setIngr(e.target.value)} required />
      </div>

      <label className="input-label">Recipe Steps:</label>
      <div className="input-box">
        <input type="text"  placeholder="Enter Recipe Steps Here" value={steps} onChange={(e) => setSteps(e.target.value)} required />
      </div>

      <button onClick={handleAddRecipe} className="add-button">
        Add Recipe
      </button>
    </div>
  );
};

export default RecipeAdd;
