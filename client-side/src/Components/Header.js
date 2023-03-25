import './ComponentStyles/Header.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import logo from '../Assets/logo.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if(isLoggedIn) {
        setUserAuthenticated(isLoggedIn);
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem("isLoggedIn")) setUserAuthenticated(true)
  }, [userAuthenticated])

  return (
    <div className='header'>
        <div className='container'>
            <span className='headerContainer'>
            <div > <Link to="/"> <img src={logo} /> </Link></div>

      <nav className="navbar menuDesktop">
        <ul>
          {userAuthenticated &&
            <>
                <li>
                    <Link to="/searchMapResults">Search Properties </Link>
                </li>
                <li>
                    <Link to="/savedLists">My List</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </>
          }
            {!userAuthenticated &&
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </>
            }
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