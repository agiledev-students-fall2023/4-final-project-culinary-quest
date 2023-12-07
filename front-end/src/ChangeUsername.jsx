import React, { useState, useEffect } from 'react';
import './ChangeUsername.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { axiosWithAuth } from './api';

function ChangeUsername() {
    const [newUsername, setNewUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when the component mounts
        const REACT_APP_SERVER_HOSTNAME = 'https://whale-app-bio98.ondigitalocean.app';
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


    const handleChangeUsername = async () => {
        if (newUsername) {
            setErrorMessage('');

            try {
                // Make the POST request to the back-end with axiosWithAuth
                const response = await axios.post('https://whale-app-bio98.ondigitalocean.app/api/change-username', {
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
            <img src={profilePicture} alt="Profile" className="profile-picture"/>
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
