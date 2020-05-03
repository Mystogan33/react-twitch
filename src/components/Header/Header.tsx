import React from 'react';
import searchIcon from './svg/SearchIcon.svg';
import menuIcon from './svg/MenuIcon.svg';

import './Header.css';

const Header = () => {
  return (
    <div>
      <nav className="headerTop">
        <ul className="menuList">
          <li className="navlink logo-link">
            <i className="fab fa-twitch fa-2x logo"></i>
          </li>
          <li className="navlink">Top Games</li>
          <li className="navlink">Top Streams</li>
          <li className="navlink">
            <form className="formSubmit">
              <input className="searchInput" placeholder="Rechercher" />
              <button type="submit">
                <img src={searchIcon} alt="searchIcon" className="searchIcon" />
              </button>
            </form>
          </li>
        </ul>
      </nav>
      <div className="menuResBtn">
        <img src={menuIcon} alt="menuIcon" className="menuIcon" />
      </div>
    </div>
  )
};

export default Header;