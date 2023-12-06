import React, { useState } from 'react';
import axios from 'axios';
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import { axiosWithAuth } from './api';

function SettingsPage() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null); // State to store the profile picture

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProfilePicture(URL.createObjectURL(file)); // Create a URL for the selected file
        }
    };

    const uploadProfilePicture = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profilePicture', selectedFile);
    
            try {
                // Replace '/api/upload-profile-picture' with your actual endpoint
                const response = await axios.post('/api/upload-profile-picture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                // After successful upload, you can update the UI or state accordingly
                console.log('Upload successful', response.data);
                setSelectedFile(null);
                setProfilePicture(null); // Reset the local profile picture preview
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const deleteAccount = async () => {
        try {
            console.log("Attempting to delete account");
            const response = await axios.delete('http://localhost:3001/api/delete-account');
            console.log("Delete response:", response);
    
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Settings</h1>
            <div className="profile-picture" onClick={() => document.getElementById('fileInput').click()} style={profilePicture ? { backgroundImage: `url(${profilePicture})`, backgroundSize: 'cover' } : {}}></div>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileSelect} />
            {selectedFile && <button onClick={uploadProfilePicture}>Upload Picture</button>}
            <div className="settings-container">
                <button className="input-like-button" onClick={() => navigate('/change-username')}>Change Username</button>
                <button className="input-like-button" onClick={() => navigate('/change-password')}>Change Password</button>
                <div className="button-group">
                    <button classname ="logoutbtn" onClick={() => navigate('/')}>Logout</button>
                    <button className="danger" onClick={deleteAccount}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
