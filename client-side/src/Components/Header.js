import './ComponentStyles/Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="header">
      <span className='headerContainer'>
        <div className='logoHeader'>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>

        <nav className="navbar menuDesktop">
          <ul>
            <li>
              <Link to="/searchMapResults">Search Properties</Link>
            </li>
            <li>
              <Link to="/savedLists">My List</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
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
