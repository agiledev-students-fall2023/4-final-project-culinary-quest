import React from "react";
import "./login.css";

export const SignIn = () => {
  return (
    <div className="SIGN-IN">
      <div className="div">
        <div className="forgot-password-sign">
          <div className="text-wrapper">Forgot Password?</div>
        </div>
        <div className="sign-in-button">
          <div className="overlap-group">
            <div className="text-wrapper-2">Log In</div>
          </div>
        </div>
        <div className="PASSWORD-sign-in">
          <div className="overlap">
            <div className="text-wrapper-3">Password</div>
          </div>
        </div>
        <div className="EMAIL-sign-in">
          <div className="overlap-2">
            <div className="rectangle" />
            <div className="text-wrapper-4">Email</div>
          </div>
        </div>
        <div className="app-logo" />
        <div className="create-account">
          <p className="don-t-have-an">
            <span className="span">Don’t have an account? </span>
            <span className="text-wrapper-5">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};