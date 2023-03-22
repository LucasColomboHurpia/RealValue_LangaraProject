import './ComponentStyles/Footer.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Footer() {
    const [menuOpen, setMenuOpen] = useState(true);
  return (
    <footer>
       <div className="logo">
       <div > <a href="/">[LOGO]</a></div>
      </div>
      
      <ul className="links">
        <li>
            <Link to="/about">About Us</Link>
            <p className='about-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
        </li>
        <li>
            <Link to="/contact">Contact Us</Link>
            <p className='contact-text'>Phone: 778-123-4567</p>
            <p className='contact-text'>Email: info@realvalue.com</p>
        </li>
        <li>
             <Link to="/terms" className='tc'>Terms and Conditions</Link><br/>
             <Link to="/privacy" className='pp'>Privacy Policy</Link>
        </li>
      </ul><br/>
      <p className="copy">
        © 2023 Quasars. All rights reserved.
      </p>
    </footer>
  );
}


export default Footer;
