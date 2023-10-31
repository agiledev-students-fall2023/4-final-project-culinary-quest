import React from 'react';
import './UpdatePhone.css';
import { useNavigate } from 'react-router-dom';

function UpdatePhone() {

    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <input type="text" placeholder="Enter New Phone Number" />
                <div className="button-group">
                    <button onClick={() => navigate('/update-contact')}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default UpdatePhone;