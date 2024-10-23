import React from 'react';
import { NavLink } from 'react-router-dom';
import { Fingerprint, User, Page, Settings } from 'iconoir-react';

export const DashboardNav = () => {
  return (
    <div className="dash-nav shadow__general">
      <ul>
        <li>
          <NavLink to="/dashboard">
            <span className="dash-nav__icon">
              <User />
            </span>
            <span>Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/ids">
            <span className="dash-nav__icon">
              <Fingerprint />
            </span>
            <span>ID</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/contracts">
            <span className="dash-nav__icon">
              <Page />
            </span>
            <span>Contracts</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings">
            <span className="dash-nav__icon">
              <Settings />
            </span>
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
