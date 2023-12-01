import React, { useState } from 'react';
import './ChangeUsername.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ChangeUsername() {
    const [newUsername, setNewUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleChangeUsername = async () => {
        if (newUsername) {
            setErrorMessage('');

            // Make the POST request to the back-end
            const response = await axios.post('http://localhost:3001/api/change-username', {
                newUsername
            });

            const data = response.data

            if (response.status === 200) {
                // If any username input, navigate to the /settings page
                navigate('/settings');
            } else {
                // If no username input, display an error message
                setErrorMessage(data.error || 'An error occurred while changing the username');
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
