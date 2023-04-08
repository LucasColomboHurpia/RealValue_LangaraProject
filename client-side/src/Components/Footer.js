import './ComponentStyles/Footer.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import logo from '../Assets/png-logo2-small.png';
import facebookLogo from '../Assets/fb.png';
import instagramLogo from '../Assets/ig.png';
import twitterLogo from '../Assets/twitter.png';
import linkedinLogo from '../Assets/in.png';

function Footer() {
    const [menuOpen, setMenuOpen] = useState(true);
  return (
       <div className="footer-container">
        <div className="column">
          <div className="row logo">
            <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          </div>
        </div>
      <div className="column">
        <div className="row">
          <h4>About us</h4><br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <h4>Contact us</h4>
        </div>
          <p>Phone: 778-123-4567</p>
        <div className="row">
          <p>Email: info@realvalue.com</p>
        </div>
        <div className="row">
          <img src={facebookLogo} alt="Facebook" className='fb'/>
          <img src={instagramLogo} alt="Instagram" className='in' />
          <img src={twitterLogo} alt="Twitter" className='twitter'/>
          <img src={linkedinLogo} alt="LinkedIn" className='in' />
        </div>
      </div>
      <div className="column">
        <div className="row">
          <h4>Terms and Conditions</h4>
        </div>
        <div className="row">
          <h4>Privacy Policy</h4>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright</p>
      </div>
    </div>
  
  );
}


export default Footer;
