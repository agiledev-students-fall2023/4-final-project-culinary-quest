import React from "react";
import { Link } from "react-router-dom";
import "./forgotPassword.css";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="ForgotPasswordPage">
      <div className="ForgotPasswordContainer">
        <div className="EnterEmail">
          <input type="text" placeholder="Email" />
        </div>
        <span className="ResetMessage">
          Please enter email to reset password
        </span>
        <div className="ResetButton">
          <Link to="/change-password" className="Reset">
            Reset Password
          </Link>
        </div>
        <div className="BackButton">
          <Link to="/login" className="Back">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="AppLogo" />
      </div>
    </div>
  );
};

export default ForgotPassword;
