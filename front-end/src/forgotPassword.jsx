import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forgotPassword.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (username) {
      setErrorMessage("");

      try {
        // Make the POST request to the back-end
        const response = await axios.post("http://localhost:3001/api/forgot-password", {
          username,
        });

        if (response.status === 200) {
          // If successful, navigate to the change-password page
          navigate("/change-password");
        } else {
          // If unsuccessful, display an error message
          setErrorMessage(response.data.error || "An error occurred while resetting the password");
        }
      } catch (error) {
        // Handle any unexpected errors
        setErrorMessage("An unexpected error occurred");
      }
    } else {
      // If username is missing, display an error message
      setErrorMessage("Please enter your username address");
    }
  };

  return (
    <div className="ForgotPasswordPage">
      <div className="ForgotPasswordContainer">
        <div className="EnterUsername">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <span className="ResetMessage">
          Please enter your username to reset the password
        </span>
        <div className="ResetButton">
          <button className="Reset" onClick={handleForgotPassword}>
            Reset Password
          </button>
        </div>
        <div className="BackButton">
          <Link to="/login" className="Back">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="AppLogo" />
      </div>
      {errorMessage && <div className="error-message-FP">{errorMessage}</div>}
    </div>
  );
}

export default ForgotPassword;
