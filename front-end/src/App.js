import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import CreateAccount from './createAccount'; // Import your CreateAccount component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} /> {/* Route for CreateAccount component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
