import React, { useState, useEffect } from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { axiosWithAuth } from './api';

function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when the component mounts
        const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;
        axios
          .get(`${REACT_APP_SERVER_HOSTNAME}/api/user`)
          .then(response => {
            const user = response.data.user;
            setProfilePicture(user.profilePicture);
          })
          .catch(err => {
            console.error("Failed to fetch user:", err);
          });
    }, []);

    const handleSubmit = async (e) => {
        const REACT_APP_SERVER_HOSTNAME = process.env.REACT_APP_BACKEND_URL;

        e.preventDefault();

        // Check if all fields are filled
        if (!password || !newPassword || !newPasswordAgain) {
            setErrorMessage('All boxes must be filled out');
            return;
        }

        // Check if new passwords match
        if (newPassword !== newPasswordAgain) {
            setErrorMessage('New password & re-enter new password must match');
            return;
        }

        // Check if new password is different from current
        if (password === newPassword) {
            setErrorMessage('Current password & new password cannot be the same');
            return;
        }

        try {
            // If all validations pass, make the POST request to the backend
            const response = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/change-password`, {
                password, newPassword, newPasswordAgain
            });

            // const data = response.data;

            navigate('/settings');

        } catch (error) {
            // Catch and display network or other errors
            const message = error.response?.data?.error || 'Failed to change password. Please try again later.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="profile-container">
            <img src={profilePicture} alt="Profile" className="profile-picture"/>
            <div className="settings-container">
                <input
                    type="password"
                    placeholder="Current Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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
                <button onClick={handleSubmit}>Submit</button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default ChangePassword;