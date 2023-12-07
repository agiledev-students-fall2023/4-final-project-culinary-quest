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
  const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/single/${id}`)
      .then(response => {
        const { name, desc, steps, time, size, ingr, img } = response.data.recipe;
  
        setRecipeName(name || '');
        setRecipeDescription(desc || '');
        setRecipeSteps(steps ? steps.join('\n\n') : ''); // Join steps with newline for display
        setRecipeTime(time ? time.toString() : ''); // Assuming time is a number
        setRecipeSize(size ? size.toString() : ''); // Assuming size is a number
        setRecipeIngr(ingr ? ingr.join('\n\n') : ''); // Join ingredients with newline for display
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
    const ingredientsArray = recipeIngr.split('\n').map(ingredient => ingredient.trim());
    const stepsArray = recipeSteps.split('\n').map(step => step.trim());
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

  const handleDelete = () => {
    const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;
    axios
        .delete(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/${id}`)
        .then(response => {
            navigate('/recipe-inventory'); // Redirect to the recipes list after deletion
        })
        .catch(err => {
            console.error("Failed to delete recipe:", err);
        });
  };

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
        <textarea
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

      <label className="input-label">Ingredients (row separated):</label>
      <div className="input-box">
        <textarea
          value={recipeIngr}
          onChange={(e) => setRecipeIngr(e.target.value)}
        />
      </div>


      <label className="input-label">Recipe Steps:</label>
      <div className="input-box">
        <textarea 
          value={recipeSteps} 
          onChange={(e) => setRecipeSteps(e.target.value)}
        />
      </div>

      <button onClick={handleSave} className="save-button">Save Recipe</button>
      <button onClick={handleDelete} className="save-button">Delete Recipe</button>
    </div>
    </div>
  );
};

export default RecipeEdit;