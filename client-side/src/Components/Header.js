import './ComponentStyles/Header.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import logo from '../Assets/logo.png';
import menuIcon from '../Assets/menuIcon.svg';

function Header() {
    const history = useNavigate();
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

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    history.push('/login');
  }

  return (
    <div className="header">
      <div className="container">
        <span className='headerContainer'>

            <>
                <img className="menuIcon" onClick={() => setMenuOpen(!menuOpen)} src={menuIcon} />
            </>

            <div className='logoHeaderContainer'>
                <Link to="/">
                    <img className='logoHeader' src={logo} />
                </Link>
            </div>

            <nav style={{ display: menuOpen ? 'block' : 'none' }} className="navbar menuDesktop">
                <ul>
                    {userAuthenticated &&
                        <>
                            <li>
                                <Link to="/searchMapResults">Search</Link>
                            </li>
                            <li>
                                <Link to="/savedLists">My Lists</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                            <li>
                                <Link onClick={logout} to="/login">Logout</Link>
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

        </span>
      </div>
    </div>
  );
}

export default Header;
