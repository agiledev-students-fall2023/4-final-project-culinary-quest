import React from 'react';
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className="settings-container">
            <input type="text" placeholder="Change username" />
            <button className="input-like-button" onClick={() => navigate('/change-password')}>Change Password</button>
            <input type="text" placeholder="Update contact information" />
            <div className="button-group">
                <button onClick={() => navigate('/')}>Logout</button>
                <button className="danger">Delete Account</button>
            </div>
        </div>
    );
}

export default SettingsPage;