import React from 'react';
import './ChangePassword.css';

function ChangePassword() {
    return (
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="settings-container">
                <input type="text" placeholder="Current Password" />
                <input type="password" placeholder="New Password" />
                <input type="text" placeholder="Re-Enter New Password" />
                <div className="button-group">
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;