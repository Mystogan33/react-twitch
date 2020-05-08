import React, { useState, useEffect, ChangeEvent } from 'react';
import searchIcon from './svg/SearchIcon.svg';
import menuIcon from './svg/MenuIcon.svg';
import crossIcon from './svg/CrossIcon.svg';

import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menu, showMenu] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const hideMenu = () => showMenu(menu ? !menu : menu);
  
  const handleSearch = (submitEvent: any) => {
    submitEvent.preventDefault();
  };

  const handleChange = (query: ChangeEvent<HTMLInputElement>) => {
    query.preventDefault();
    setSearchQuery(query.target.value);
  };

  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (
          <ul className="menuList">
          <li className="navlink logo-link">
            <Link className="link" to="/" onClick={hideMenu}>
              <i className="fab fa-twitch fa-2x logo"></i>
            </Link>
          </li>
          <li className="navlink">
            <Link className="link" to="/" onClick={hideMenu}>
              Top Games
            </Link>
          </li>
          <li className="navlink">
            <Link className="link" to="/top-streams" onClick={hideMenu}>
              Top Streams
            </Link>
          </li>
          <li className="navlink">
            <form className="formSubmit" onSubmit={handleSearch}>
              <input value={searchQuery} onChange={handleChange} className="searchInput" placeholder="Rechercher" required />
              <Link to={{ pathname: `/search/${searchQuery}` }} className="link">
                <button type="submit">
                  <img src={searchIcon} alt="searchIcon" className="searchIcon" />
                </button>
              </Link>
            </form>
          </li>
        </ul>
        )}
      </nav>
      <div className="menuResBtn">
        <img onClick={() => showMenu(!menu)} src={menu ? crossIcon : menuIcon } alt="menuIcon" className="menuIcon" />
      </div>
    </div>
  )
};

export default Header;