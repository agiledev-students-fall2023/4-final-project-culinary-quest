import React from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function CreateAccount() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRePassword, setNewRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    if (newName && newEmail && newPassword && newRePassword) {
      setErrorMessage("");

      try {
        // Make the POST request to the back-end
        const response = await axios.post("http://localhost:3001/api/create-account", {
          newName,
          newEmail,
          newPassword,
          newRePassword,
        });

        if (response.status === 200) {
          // If successful, navigate to the login page
          navigate("/login");
        } else {
          // If unsuccessful, display an error message
          setErrorMessage(response.data.error || "An error occurred while creating the account");
        }
      } catch (error) {
        // Handle any unexpected errors
        setErrorMessage("An unexpected error occurred");
      }
    } else {
      // If any field is missing, display an error message
      setErrorMessage("Please fill in all the required fields");
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
