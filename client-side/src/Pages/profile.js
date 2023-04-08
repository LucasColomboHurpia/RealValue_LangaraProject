import './pageStyles/profile.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import accountLogo from '../Assets/png-profile-icon-white.png';  
import saveLogo from '../Assets/png-save-white.png';
import logoutLogo from '../Assets/png-logout-white.png';  
import next from '../Assets/Vector.png';
import editIcon from '../Assets/png-edit-icon2.png';


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
              <img src={accountLogo} alt="account-info"/>
                Account Information <img src={next} alt="next"className='nextIcon'/>
              </a>
            </li>
            <li>
              <div className="my-lists">
                <Link to="/savedLists">
                <img src={saveLogo} alt="My List"/>
                  My Lists <img src={next} alt="next" className='nextIcon'/>
                </Link>
              </div>
            </li>
            <li className="logout">
              <a href="#">
              <img src={logoutLogo} alt="Logout"/>
                Logout <img src={next} alt="next" className='nextIcon'/>
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div className="right">
        <div className="input-field">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
          {/* <img src={editIcon} alt="editIcon"/> */}
        </div>
        <div className="input-field">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jdoe@email.com" />
          {/* <img src={editIcon} alt="editIcon"/> */}
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
