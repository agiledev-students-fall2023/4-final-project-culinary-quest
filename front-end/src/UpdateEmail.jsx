import React from 'react';
import './UpdateEmail.css';
import { useNavigate } from 'react-router-dom';

function UpdateEmail() {

    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <input type="text" placeholder="Enter New Email" />
                <div className="button-group">
                    <button onClick={() => navigate('/update-contact')}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmail;