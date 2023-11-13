import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      try {
        // Make the POST request to the back-end
        const response = await axios.post("http://localhost:3001/api/login", {
          email,
          password,
        });

        if (response.status === 200) {
          // If successful, navigate to the home page
          navigate("/home");
        } else {
          // If unsuccessful, display an error message
          setErrorMessage(response.data.error || "An error occurred while logging in");
        }
      } catch (error) {
        // Handle any unexpected errors
        setErrorMessage("An unexpected error occurred");
      }
    } else {
      // If email or password is missing, display an error message
      setErrorMessage("Please provide both email and password");
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="InputEmail">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
