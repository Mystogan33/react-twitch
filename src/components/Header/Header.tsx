import React, { useState, useEffect } from 'react';
import searchIcon from './svg/SearchIcon.svg';
import menuIcon from './svg/MenuIcon.svg';

import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menu, showMenu] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  const handleMediaQueryChange = (mediaQuery: any) => {
    if(mediaQuery.matches) setSmallScreen(true);
    else setSmallScreen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    }
  });

  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (
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
        )}
      </nav>
      <div className="menuResBtn">
        <img onClick={() => showMenu(!menu)} src={menuIcon} alt="menuIcon" className="menuIcon" />
      </div>
    </div>
  )
};

export default Header;