import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeEdit.css';

const RecipeEdit = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeSteps, setRecipeSteps] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipeSize, setRecipeSize] = useState('');
  const [recipeIngr, setRecipeIngr] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';

  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/single/${id}`)
      .then(response => {
        const { name, desc, steps, time, size, ingr, img } = response.data.recipe;

        setRecipeName(name || '');
        setRecipeDescription(desc || '');
        setRecipeSteps(steps || '');
        setRecipeTime(time ? time.toString() : ''); // Assuming time is a number
        setRecipeSize(size ? size.toString() : ''); // Assuming size is a number
        setRecipeIngr(ingr ? ingr.join(', ') : ''); // Assuming ingr is an array
        setImageSrc(img || '');
      })
      .catch(err => {
        console.error('Failed to fetch recipe:', err);
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
    const ingredientsArray = recipeIngr.split(',').map(ingredient => ingredient.trim());
    try {
      console.log(`saving ${id}`)
      axios
        .put(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/edit/${id}`, {
          name: recipeName,
          desc: recipeDescription,
          steps: recipeSteps,
          time: parseInt(recipeTime, 10),
          size: parseInt(recipeSize, 10),
          ingr: ingredientsArray,
          img: imageSrc,
        })
        .then(response => {
          navigate(`/recipes/single/${id}`);
        })
    }
    catch (error) {
      console.error('Failed to save recipe:', error);
    }
  }

  return (
    <div classname="container">
    <div className="recipe-edit">
      <h1>Edit Recipe</h1>
      <label className="image-upload-label">
          {imageSrc ? <img src={imageSrc} alt="Uploaded Recipe" className="uploaded-image"/> : 
          <div className="image-section">RECIPE IMAGE<br />Upload a picture or take a picture</div>}
          <input type="file" className="image-upload-input" accept="image/*" capture onChange={handleImageChange} />
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

      <label className="input-label">Preparation Time (in minutes):</label>
      <div className="input-box">
        <input 
          type="number" 
          value={recipeTime} 
          onChange={(e) => setRecipeTime(e.target.value)}
        />
      </div>

      <label className="input-label">Serving Size:</label>
      <div className="input-box">
        <input 
          type="number" 
          value={recipeSize} 
          onChange={(e) => setRecipeSize(e.target.value)}
        />
      </div>

      <label className="input-label">Ingredients (comma separated):</label>
      <div className="input-box">
        <input 
          type="text" 
          value={recipeIngr} 
          onChange={(e) => setRecipeIngr(e.target.value)}
        />
      </div>

      <label className="input-label">Recipe Steps:</label>
      <div className="input-box-steps">
        <textarea 
          value={recipeSteps} 
          onChange={(e) => setRecipeSteps(e.target.value)}
        />
      </div>

      <button onClick={handleSave} className="save-button">Save Recipe</button>
    </div>
    </div>
  );
};

export default RecipeEdit;
