import React from 'react';
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                {/* <input className="input-like-button" type="text" placeholder="Change Username" /> */}
                <button className="input-like-button" onClick={() => navigate('/change-username')}>Change Username</button>
                <button className="input-like-button" onClick={() => navigate('/change-password')}>Change Password</button>
                <input className="input-like-button" type="text" placeholder="Update Contact Information" />
                <div className="button-group">
                    <button onClick={() => navigate('/')}>Logout</button>
                    <button className="danger">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;