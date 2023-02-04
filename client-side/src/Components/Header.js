import './ComponentStyles/Header.css';
import React, { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(true);
  return (
    <header className="header">
    <div>[ICON]</div>

     <nav className="navbar menuDesktop">
        <ul>
          <li>
            <a href="#">Search Properties </a>
          </li>
          <li>
            <a href="#">My List</a>
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