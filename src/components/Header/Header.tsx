import React from 'react';
import searchIcon from './svg/SearchIcon.svg';
import menuIcon from './svg/MenuIcon.svg';

import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className="headerTop">
        <ul className="menuList">
          <li className="navlink logo-link">
            <Link className="link" to="/">
              <i className="fab fa-twitch fa-2x logo"></i>
            </Link>
          </li>
          <li className="navlink">
            <Link className="link" to="/">
              Top Games
            </Link>
          </li>
          <li className="navlink">
            <Link className="link" to="/top-streams">
              Top Streams
            </Link>
          </li>
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