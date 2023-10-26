// App.js
import React from 'react';
//import { Link } from "react-router-dom";
import Header from './header';  // Import the header component
import IndvRecipe from './indv_recipe';

function App() {
  IndvRecipe()
  return (
    <div className="App"> 
      <IndvRecipe />
    </div>
  );
}

export default App; 