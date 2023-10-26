// App.js
import React from 'react';
import Header from './header';  // Import the header component
import SettingsPage from './SettingsPage';
import IndvRecipe from './indv_recipe';
import CreateAccount from './createAccount';
import Login from './login';
import ForgotPassword from './forgotPassword';
import Ingredient_Inventory from './ingredient_inventory';
import Ingredient_Search from './ingredient_search';

function App() {
  return (
    <div className="App"> 
      <Header />
      <Login />
      <CreateAccount />
      <ForgotPassword />
      <IndvRecipe />
      <Ingredient_Inventory />
      <Ingredient_Search />
      <SettingsPage />
    </div>
  );
}

export default App; 