import './ComponentStyles/Header.css';
import React, { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(true);
  return (
    <header className="header">
    <div > <a href="/">[LOGO]</a></div>

     <nav className="navbar menuDesktop">
        <ul>
          <li>
            <a href="/searchResults">Search Properties </a>
          </li>
          <li>
            <a href="/savedLists">My List</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
        </ul>
      </nav>

<div className='navbarMobile'>
    Mobile Menu
 </div>

    </header>
  );
}

export default Header;