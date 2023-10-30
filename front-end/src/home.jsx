import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Login = () => {
  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="InputEmail">
          <input type="text" placeholder="Email"/>
        </div>
        <div className="InputPassword">
          <input type="password" placeholder="Password"/>
        </div>
        <Link to="/forgot-password" className="ForgotPasswordLink">
          Forgot Password?
        </Link>
        <div className="LoginButton">
          <Link to="/home" className="Login">
            Log In
          </Link>
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
    </div>
  );
};

export default Login;
