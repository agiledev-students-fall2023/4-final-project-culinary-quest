import React, { useState } from 'react';
import './resetPassword.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!newPassword || !newPasswordAgain) {
      setErrorMessage('All boxes must be filled out');
      return;
    }

    // Check if new passwords match
    if (newPassword !== newPasswordAgain) {
      setErrorMessage('New password & re-enter new password must match');
      return;
    }

    try {
      // If all validations pass, make the POST request to the backend
      const response = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/reset-password`, {
        newPassword,
        newPasswordAgain,
      });

      navigate('/login');
    } catch (error) {
      // Catch and display network or other errors
      const message = error.response?.data?.error || 'Failed to change password. Please try again later.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="profile-container">
      <div className="settings-container">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-enter New Password"
          value={newPasswordAgain}
          onChange={(e) => setNewPasswordAgain(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleSubmit}>Reset</button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default ResetPassword;
