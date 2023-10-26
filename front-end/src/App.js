// App.js
import React from 'react';
import Header from './header';  // Import the header component
import SettingsPage from './SettingsPage';
import IndvRecipe from './indv_recipe';
import CreateAccount from './createAccount';
import Login from './login';

function App() {
  return (
    <div className="App"> 
      <Header />
      <CreateAccount />
      <Login />
      <IndvRecipe />
      <SettingsPage />
    </div>
  );
}

export default App; 