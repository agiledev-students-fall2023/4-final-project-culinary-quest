import React, { useState } from 'react';
import './ChangeUsername.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { axiosWithAuth } from './api';

function ChangeUsername() {
    const [newUsername, setNewUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleChangeUsername = async () => {
        if (newUsername) {
            setErrorMessage('');

            try {
                // Make the POST request to the back-end with axiosWithAuth
                const response = await axiosWithAuth().post('http://localhost:3001/api/change-username', {
                    newUsername
                });

                // If successful, navigate to the /settings page
                navigate('/settings');
            } catch (error) {
                // If an error occurs, display an error message
                const message = error.response?.data?.error || 'An error occurred while changing the username';
                setErrorMessage(message);
            }
        } else {
            // If no username is input, set the error message state
            setErrorMessage('Please input a new Username');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <input
                    type="text"
                    placeholder="Enter New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <div className="button-group">
                    <button onClick={handleChangeUsername}>Submit</button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default ChangeUsername;
