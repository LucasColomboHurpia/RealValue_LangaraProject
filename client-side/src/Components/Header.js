import './ComponentStyles/Header.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import logo from '../Assets/logo.png';
import cross from '../Assets/Cross.svg';
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
    window.addEventListener('resize', function () {
        if(document.documentElement.clientWidth >= 767 ){
            setMenuOpen(true)
        }
        else {
            setMenuOpen(false)
        }
    });
  }, [])

  useEffect(() => {
    if(localStorage.getItem("isLoggedIn")) setUserAuthenticated(true)
  }, [userAuthenticated])

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    history.push('/login');
  }

  const navAaway = () => {
    if(document.documentElement.clientWidth <= 767){
        setMenuOpen(false)
    }
  }

  return (
    <div className="header">
      <div className="container">
        <span className='headerContainer'>

            <>
                <img className="menuIcon" onClick={() => setMenuOpen(true)} src={menuIcon} />
            </>

            <div className='logoHeaderContainer'>
                <Link to="/">
                    <img className='logoHeader' src={logo} />
                </Link>
            </div>

            <nav style={{ display: menuOpen ? 'flex' : 'none' }} className="navbar menuDesktop">
                <img className="closeIcon" onClick={() => setMenuOpen(false)} src={cross} />
                <ul>
                    {userAuthenticated &&
                        <>
                            <li>
                                <Link onClick={navAaway} to="/searchMapResults">Search</Link>
                            </li>
                            <li>
                                <Link onClick={navAaway} to="/savedLists">My Lists</Link>
                            </li>
                            <li>
                                <Link onClick={navAaway} to="/profile">Profile</Link>
                            </li>

                            <li>
                                <Link onClick={() => {setMenuOpen(false); logout()}} to="/login">Logout</Link>
                            </li>
                        </>
                    }
                    {!userAuthenticated &&
                        <>
                            <li>
                                <Link onClick={navAaway} to="/login">Login</Link>
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
