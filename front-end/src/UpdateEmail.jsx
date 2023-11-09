import React, { useState } from 'react';
import './UpdateEmail.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UpdateEmail() {
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdateEmail = async () => {
        if (newEmail) {
            setErrorMessage('');

            // Make the POST request to the back-end
            const response = await axios.post('http://localhost:3001/api/update-email', {
                newEmail
            });

            const data = response.data

            if (response.status === 200) {
                // If any email input, navigate to the /settings page
                navigate('/settings');
            } else {
                // If no email input, display an error message
                setErrorMessage(data.error || 'An error occurred while changing the email');
            }
        } else {
            // If no email is input, set the error message state
            setErrorMessage('Please input a new email address');
        }
    };    

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
            <input
                    type="text"
                    placeholder="Enter New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <div className="button-group">
                    <button onClick={handleUpdateEmail}>Submit</button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default UpdateEmail;