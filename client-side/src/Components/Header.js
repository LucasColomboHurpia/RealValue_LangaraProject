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
                    <Link to="/searchMapResults">Search </Link>
                </li>
                <li>
                    <Link to="/savedLists">My Lists</Link>
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
    </div>
  );
}

export default Header;