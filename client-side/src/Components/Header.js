import './ComponentStyles/Header.css';
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import logo from '../Assets/logo.png'
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
>>>>>>> b20183fce6e98beb10e51a49c66a32a8dde53a82

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
    <div className="header">
      <span className='headerContainer'>
        <div className='logoHeader'>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> b20183fce6e98beb10e51a49c66a32a8dde53a82

        <div className='navbarMobile'>
          Mobile Menu
        </div>
      </span>
    </div>
  );
}

export default Header;
