import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import SettingsPage from './SettingsPage';
import IndvRecipe from './indv_recipe';
import CreateAccount from './createAccount';
import Login from './login';
import ForgotPassword from './forgotPassword';
import Ingredient_Inventory from './ingredient_inventory';
import Ingredient_Search from './ingredient_search';
import ChangePassword from './ChangePassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recipe" element={<IndvRecipe />} />
          <Route path="/inventory" element={<Ingredient_Inventory />} />
          <Route path="/search" element={<Ingredient_Search />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Login />} exact />  {/* This is the default route */}
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App; 