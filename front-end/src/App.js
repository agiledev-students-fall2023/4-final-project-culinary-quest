import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header";
import SettingsPage from "./SettingsPage";
import IndivRecipe from "./indiv_recipe";
import CreateAccount from "./createAccount";
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import Ingredient_Inventory from "./ingredient_inventory";
import Ingredient_Search from "./ingredient_search";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import RecipeInv from "./recipe_inventory";
import Burger from "./burger";
import IngredientAdd from "./IngredientAdd";
import RecipeAdd from "./RecipeAdd";
import Home from "./home";
import RecipeEdit from "./RecipeEdit";
import Ingredient from "./Ingredient";
import IngredientEdit from "./IngredientEdit";
import UpdateContact from "./UpdateContact";
import UpdateEmail from "./UpdateEmail";
import UpdatePhone from "./UpdatePhone";
import RecipeSearch from "./RecipeSearch";

import "./App.css";

function Main() {
  const [menuState, activateMenu] = useState(0);
  const location = useLocation();

  return (
    <div className="App">
      <div className="app-window">
      { !['/create-account', '/login', '/forgot-password', '/'].includes(location.pathname) && 
          <Header menuState={menuState} activateMenu={activateMenu} /> 
        }
        <Burger menuState={menuState} activateMenu={activateMenu} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/recipe" element={<IndivRecipe />} />
            <Route path="/inventory" element={<Ingredient_Inventory />} />
            <Route path="/search" element={<Ingredient_Search />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/change-username" element={<ChangeUsername />} />
            <Route path="/update-contact" element={<UpdateContact />} />
            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/update-phone" element={<UpdatePhone />} />
            <Route path="/ingredient-add" element={<IngredientAdd />} />
            <Route path="/recipe-add" element={<RecipeAdd />} />
            <Route path="/recipe-edit" element={<RecipeEdit />} />
            
            <Route path="/ingredients/:id" element={<Ingredient />} />
            <Route path="/ingredient-edit" element={<IngredientEdit />} />
            <Route path="/recipe-inventory" element={<RecipeInv />} />
            <Route path="/recipe-search" element={<RecipeSearch />} />
            <Route path="/" element={<Login />} exact />{" "}
          </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  )
}

export default App;
