// src/SettingsPage.js
import React from 'react';
import './SettingsPage.css';

// const SettingsPage = () => {
//     return (
//         <div className="settings-container">
//             <div className="input-box">
//                 <label htmlFor="change-email">Change Email:</label>
//                 <textarea id="change-email" placeholder="Enter new email"></textarea>
//             </div>

//             <div className="input-box">
//                 <label htmlFor="change-password">Change Password:</label>
//                 <textarea id="change-password" placeholder="Enter new password"></textarea>
//             </div>

//             <div className="input-box">
//                 <label htmlFor="update-contact">Update Contact Information:</label>
//                 <textarea id="update-contact" placeholder="Enter updated contact information"></textarea>
//             </div>

//             <div className="button-group">
//                 <button>Logout</button>
//                 <button className="danger">Delete Account</button>
//             </div>
//         </div>
//     );
// }

function SettingsPage() {
    return (
        <div className="settings-container">
            <input type="text" placeholder="Change username" />
            <input type="password" placeholder="Change password" />
            <input type="text" placeholder="Update contact information" />
            <div className="button-group">
                <button>Logout</button>
                <button className="danger">Delete Account</button>
            </div>
        </div>
    );
}

export default SettingsPage;