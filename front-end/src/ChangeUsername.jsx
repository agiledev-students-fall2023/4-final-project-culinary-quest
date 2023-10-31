import React from 'react';
import './ChangeUsername.css';
import { useNavigate } from 'react-router-dom';

function ChangeUsername() {

    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <input type="text" placeholder="Enter New Username" />
                <div className="button-group">
                    <button onClick={() => navigate('/settings')}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ChangeUsername;