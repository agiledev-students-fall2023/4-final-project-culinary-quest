import React from 'react';
import './UpdateContact.css';
import { useNavigate } from 'react-router-dom';

function UpdateContact() {

    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <button className="input-like-button" onClick={() => navigate('/update-email')}>Update Email</button>
                <button className="input-like-button" onClick={() => navigate('/update-phone')}>Update Phone Number</button>
                <div className="button-group">
                    <button onClick={() => navigate('/settings')}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateContact;