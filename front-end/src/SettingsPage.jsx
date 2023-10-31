import React from 'react';
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <button className="input-like-button" onClick={() => navigate('/change-username')}>Change Username</button>
                <button className="input-like-button" onClick={() => navigate('/change-password')}>Change Password</button>
                <button className="input-like-button" onClick={() => navigate('/update-contact')}>Update Contact Information</button>
                <div className="button-group">
                    <button onClick={() => navigate('/')}>Logout</button>
                    <button className="danger" onClick={() => navigate('/')}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;