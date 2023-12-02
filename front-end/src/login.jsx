import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        // Make the POST request to the back-end
        const response = await axios.post("http://localhost:3001/api/login", {
          username,
          password,
        });

        if (response.data.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.data.token);

          // Add token to axios headers for subsequent requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

          // If successful, navigate to the home page
          navigate("/home");

          // Log to console
          console.log('User logged in:', response.data.token);
        } else {
          // If unsuccessful, display an error message
          setErrorMessage("Login failed: Invalid username or password");
        }
      } catch (error) {
        // Handle any unexpected errors
        const message = error.response?.data?.error || "An unexpected error occurred";
        setErrorMessage(message);
      }
    } else {
      // If username or password is missing, display an error message
      setErrorMessage("Please provide both username and password");
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="InputUsername">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="InputPassword">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Link to="/forgot-password" className="ForgotPasswordLink">
          Forgot Password?
        </Link>
        <div className="LoginButton">
          <button className="Login" onClick={handleLogin}>
            Log In
          </button>
        </div>
        <div className="SignUpLink">
          <span className="CreateMessage">
            Don’t have an account? {" "}
          </span>
          <Link to="/create-account" className="SignUpText">
            Sign Up
          </Link>
        </div>
        <div className="AppLogo" />
      </div>
      {errorMessage && <div className="error-message-log">{errorMessage}</div>}
    </div>
  );
}

export default Login;
