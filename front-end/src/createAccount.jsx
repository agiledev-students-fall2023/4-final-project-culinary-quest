import React from "react";
import { Link, redirect } from "react-router-dom";
import "./createAccount.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import jwt_decode from 'jwt-decode';

function CreateAccount() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRePassword, setNewRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    try {
      console.log('Sending request to create account:', { newName, newEmail, newPassword, newRePassword });

      const response = await axios.post("http://localhost:3001/api/create-account", {
        newName,
        newEmail,
        newPassword,
        newRePassword,
      });

      console.log('Response from server:', response.data);

      if (response.status === 200) {
        const { token } = response.data;
        const decodedToken = jwt_decode(token);

        // Save the token to local storage or session storage
        localStorage.setItem('token', token);

        console.log('Account created successfully. Decoded token:', decodedToken);

        // Navigate to the login page or any other page as needed
        navigate(redirect || "/api/login");
      } else {
        console.error('Error creating account. Server response:', response.data);
        setErrorMessage(response.data.error || "An error occurred while creating the account");
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error.response?.data.error || error.message);
      setErrorMessage(error.response?.data.error || "An unexpected error occurred");
    }
  };

  return (
    <div className="CreateAccountPage">
      <div className="CreateAccountContainer">
        <div className="CreateName">
          <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className="CreateEmail">
          <input type="text" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </div>
        <div className="CreatePassword">
          <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="Re-enterPassword">
          <input type="password" placeholder="Re-enter Password" value={newRePassword} onChange={(e) => setNewRePassword(e.target.value)} />
        </div>
        <span className="PasswordRequirement">
          <em>
            - Must be at least 8 characters long.<br />
            - Must contain at least one number. <br />
            - Must contain at least one special character. <br />
            - Must contain at least one uppercase letter.
          </em>
        </span>
        <div className="CreateButton">
          <button className="Create" onClick={handleCreateAccount}>
            Create Account
          </button>
        </div>
        <div className="BackButton">
          <Link to="/login" className="Back">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="AppLogo" />
      </div>
      {errorMessage && <div className="error-message-CA">{errorMessage}</div>}
    </div>
  );
}

export default CreateAccount;
