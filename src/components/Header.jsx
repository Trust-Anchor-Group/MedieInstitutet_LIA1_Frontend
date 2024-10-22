import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import UserContext from '../state/UserContext';
import { User, LogOut } from 'iconoir-react';
import { LogoutBtn } from './LogoutBtn';

const Header = () => {
  const { isAuthenticated, logoutState } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);

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
          {isAuthenticated ? (
            <li>
              <div className="action-menu">
                <ul>
                  <li className="profile">
                    <NavLink to="/dashboard">
                      {userInfo && userInfo.userName ? (
                        `${userInfo.userName.charAt(0).toUpperCase()}.`
                      ) : (
                        <User />
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <LogoutBtn />
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Sign in</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
