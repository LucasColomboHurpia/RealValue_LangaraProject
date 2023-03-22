import './ComponentStyles/Header.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import logo from '../Assets/logo.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className='header'>
        <div className='container'>
            <span className='headerContainer'>
            <div > <Link to="/"> <img src={logo} /> </Link></div>

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
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>

            <div className='navbarMobile'>
                Mobile Menu
            </div>
            </span>
            </div>
    </div>
  );
}

export default Header;