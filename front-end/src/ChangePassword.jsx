import React from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {

    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <input type="text" placeholder="Current Password" />
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Re-Enter New Password" />
                <div className="button-group">
                    <button onClick={() => navigate('/settings')}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;