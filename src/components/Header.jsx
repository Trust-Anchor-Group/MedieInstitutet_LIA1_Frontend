import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <header>
      <div className="header__banner">
        <a href="/" className="logo">
          <img src="./public/logo.png" alt="" />
        </a>
      </div>

      <nav className="shadow__general">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/tokenDetail">token detail</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
