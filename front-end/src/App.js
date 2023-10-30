import React, { useState } from "react";
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
import RecipeInv from "./recipe_inventory";
import Burger from "./burger";
import IngredientAdd from "./IngredientAdd";
import RecipeAdd from "./RecipeAdd";
import Home from "./home";
import RecipeEdit from "./RecipeEdit";
import Ingredient from "./Ingredient";
import IngredientEdit from "./IngredientEdit";

import "./App.css";

function App() {
  const [menuState, activateMenu] = useState(0);
  return (
    <div className="App">
      <div className="app-window">
        <Header menuState={menuState} activateMenu={activateMenu} />
        <Router>
          {/* Burger is placed inside the router so the links within work properly */}
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
            <Route path="/ingredient-add" element={<IngredientAdd />} />
            <Route path="/recipe-add" element={<RecipeAdd />} />
            <Route path="/recipe-edit" element={<RecipeEdit />} />
            <Route path="/ingredient" element={<Ingredient />} />
            <Route path="/ingredient-edit" element={<IngredientEdit />} />
            <Route path="/" element={<Login />} exact />{" "}
            {/*This is the default route*/}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
