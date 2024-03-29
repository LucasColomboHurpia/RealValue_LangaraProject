import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import facebookLogo from '../Assets/icons8-facebook-f-30.png';
import googleLogo from '../Assets/icons8-google-24.png';

import axios from 'axios';

import APIURL from '../constants/apiUrl';
import Alert from '../Components/Alert';

import './pageStyles/login.css';


const LoginPage = () => {
    const history = useNavigate();
    const testEmail = "ObikaForPresident2023@realvu.com";
    const testPW = "ObikaForPresident2023";
    const [email, setEmail] = useState(testEmail);
    const [password, setPassword] = useState(testPW);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onLogin = async () => {

        if(email !== testEmail || password !== testPW) {

        }

        if(email && password) {
            const response = await axios.post(`/api/v1/auth/login`, {
                email, password
            });

            if(response && response.data.status==="success") {
                const user = response.data.data.user
                const token = response.data.token
    
                localStorage.setItem("isLoggedIn", true)
                localStorage.setItem("setReloadMain", true)
                localStorage.setItem("authUser", JSON.stringify(user));
                localStorage.setItem("token", token);
                window.location.href = "/";
            }
        }
    }

    return (
        <div className="login-page">
        <div className="left-side">
        </div>
        <div className="right-side">
            <h2>Login</h2>

            <div className="input-group">
                <input type="email" value={email} onChange={onChangeEmail} placeholder="Enter your email address" required />
            </div>

            <div className="input-group">
                <input type="password" value={password} onChange={onChangePassword} placeholder="Password" required />
                <i className="fa fa-eye-slash"></i>
            </div>
            
            <div className="forgot-password">
            <div className="checkbox">
            <label>
                <input type="checkbox" />
                Keep me logged in
            </label>
            </div>
            <span>Forgot password?</span>
            </div>
            <button onClick={onLogin} className="login-btn">Login</button>
            <div className="separator">or continue with</div>
            <div className="social-btns">
            <button className="google-btn">
            <img src={googleLogo} alt="Google" className='google'/> Google
            </button>
            <button className="facebook-btn">
            <img src={facebookLogo} alt="Facebook" className='fbook'/> Facebook
            </button>
            </div>
            <div className="signup-link">
            Don't have an account? <a href="#">Sign up</a>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;
