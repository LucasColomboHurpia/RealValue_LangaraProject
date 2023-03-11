import './ComponentStyles/Header.css';
import React, { useState } from 'react';
import logo from '../Assets/logo.png'
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="header">
      <span className='headerContainer'>
      <div > <Link to="/"> <img src={logo} /> </Link></div>

      <nav className="navbar menuDesktop">
        <ul>
          <li>
            <Link to="/searchResults">Search Properties </Link>
          </li>
          <li>
            <Link to="/savedLists">My List</Link>
          </li>
          <li>
            <Link to="#">Profile</Link>
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