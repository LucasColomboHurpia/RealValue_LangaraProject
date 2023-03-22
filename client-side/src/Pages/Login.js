import './pageStyles/login.css';
import React, { useState } from 'react';

// import image from "./image.jpg"; // import your image here

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="left-side">
        <img src={"#"} alt="login" />
      </div>
      <div className="right-side">
        <h2>Login</h2>
        <div className="input-group">
          <input type="email" placeholder="Enter your email address" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" />
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
        <button className="login-btn">Login</button>
        <div className="separator">or continue with</div>
        <div className="social-btns">
          <button className="google-btn">
            <i className="fa fa-google"></i> Google
          </button>
          <button className="facebook-btn">
            <i className="fa fa-facebook"></i> Facebook
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
