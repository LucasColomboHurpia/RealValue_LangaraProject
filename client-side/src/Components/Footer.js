import './ComponentStyles/Footer.css';
import React, { useState } from 'react';

function Footer() {
    const [menuOpen, setMenuOpen] = useState(true);
  return (
    <footer>
       <div className="logo">
       <div > <a href="/">[LOGO]</a></div>
      </div>
      
      <ul className="links">
        <li>
            <a href="/about">About Us</a>
            <p className='about-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
        </li>
        <li>
            <a href="/contact">Contact Us</a>
            <p className='contact-text'>Phone: 778-123-4567</p>
            <p className='contact-text'>Email: info@realvalue.com</p>
        </li>
        <li>
             <a href="/terms" className='tc'>Terms and Conditions</a><br/>
             <a href="/privacy" className='pp'>Privacy Policy</a>
        </li>
      </ul><br/>
      <p className="copy">
        © 2023 Quasars. All rights reserved.
      </p>
    </footer>
  );
}


export default Footer;
