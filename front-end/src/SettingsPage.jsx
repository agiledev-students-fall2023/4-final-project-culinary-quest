import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [isImageChanged, setIsImageChanged] = useState(false); // New state variable
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Fetch user data when the component mounts
        const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';
        axios
          .get(`${REACT_APP_SERVER_HOSTNAME}/api/user`)
          .then(response => {
            const user = response.data.user;
            setProfilePicture(user.profilePicture);
            setIsImageChanged(false); // Reset here
          })
          .catch(err => {
            console.error("Failed to fetch user:", err);
          });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
                setIsImageChanged(true); // Set to true when a new image is selected
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        //fileInputRef.current.click();
    };

    const handleSave = () => {
        const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001';
        axios
            .post(`${REACT_APP_SERVER_HOSTNAME}/api/upload-profile-picture`, {
                imageURL: profilePicture
            })
            .then(response => {
                setIsImageChanged(false); // Reset after saving
            })
            .catch(err => {
                console.error("Failed to save profile:", err);
                setUploadError(err.message);
            });
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

            <label className="profile-picture" onClick={handleImageClick}>
                <img src={profilePicture} alt="Profile" className="profile-picture"/>
                <input type="file" ref={fileInputRef} className="image-upload-input" accept="image/*" capture onChange={handleImageChange} style={{ display: 'none' }} />
            </label>

            {isImageChanged && (
                <button onClick={handleSave} className="save-button">Save Profile Image</button>
            )}

            <div className="settings-container">
                <button className="input-like-button" onClick={() => navigate('/change-username')}>Change Username</button>
                <button className="input-like-button" onClick={() => navigate('/change-password')}>Change Password</button>
                <div className="button-group">
                    <button className="logoutbtn" onClick={() => navigate('/')}>Logout</button>
                    <button className="danger" onClick={deleteAccount}>Delete Account</button>
                </div>
            </div>
            
        </div>
    );
}

export default SettingsPage;
