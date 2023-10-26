// App.js
import React from 'react';
import './App.css';
import SettingsPage from './SettingsPage';
//import { Link } from "react-router-dom";
import './header_style.css';          // Import the styles
import Header from './header';  // Import the header component

function App() {
  return (
    <div className="App">
      <Header />   
      <SettingsPage />           
    </div>
  );
}

export default App; 