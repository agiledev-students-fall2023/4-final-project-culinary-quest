import React, { useState } from 'react';
import './UpdatePhone.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UpdatePhone() {
    const [newPhone, setNewPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdatePhone = async () => {
        if (newPhone) {
            setErrorMessage('');

            // Make the POST request to the back-end
            const response = await axios.post('https://whale-app-bio98.ondigitalocean.app/api/update-phone', {
                newPhone
            });

            const data = response.data

            if (response.status === 200) {
                // If any phone input, navigate to the /settings page
                navigate('/settings');
            } else {
                // If no phone input, display an error message
                setErrorMessage(data.error || 'An error occurred while changing the phone number');
            }
        } else {
            // If no phone number is input, set the error message state
            setErrorMessage('Please input a new phone number');
        }
    };     

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
            <input
                    type="text"
                    placeholder="Enter New Phone Number"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                />
                <div className="button-group">
                    <button onClick={handleUpdatePhone}>Submit</button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default UpdatePhone;