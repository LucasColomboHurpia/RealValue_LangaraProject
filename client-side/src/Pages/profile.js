import './pageStyles/profile.css';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleSave = () => {
    // handle save logic here
  };

  const handleCancel = () => {
    // handle cancel logic here
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if(isLoggedIn) {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        setName(authUser.name)
        setEmail(authUser.email)
    }
  }, [])

  return (
    <div className="profile-container">
      <div className="left">
        <h1 className="name">Jane Doe</h1>
        <div className="links">
          <ul>
            <li>
              <a href="#" className="account-info">
              Account Information <i className="fas fa-angle-right"></i>
              </a>
            </li>
            <li>
              <a href="#" className="my-lists">
              My Lists <i className="fas fa-angle-right"></i>
               </a>
            </li>
            <li className="logout">
              <a href="#">
              <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </div>
        
      </div>
      <div className="right">
        <div className="input-field">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
          <i className="fas fa-edit"></i>
        </div>
        <div className="input-field">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jdoe@email.com" />
          <i className="fas fa-edit"></i>
          <a href="#" className="change-password">
            Change Password
          </a>
        </div>
        <div className="buttons">
          <button className="cancel">Cancel</button>
          <button className="save">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
