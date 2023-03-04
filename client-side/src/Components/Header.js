import './ComponentStyles/Header.css';
import React, { useState } from 'react';
import logo from '../Assets/logo.png'


function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="header">
      <span className='headerContainer'>
      <div > <a href="/"> <img src={logo} /> </a></div>

      <nav className="navbar menuDesktop">
        <ul>
          <li>
            <a href="/searchMapResults">Search Properties </a>
          </li>
          <li>
            <a href="/savedLists">My List</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>

      <div className='navbarMobile'>
        Mobile Menu
      </div>
      </span>
    </div>
  );
}

export default Header;