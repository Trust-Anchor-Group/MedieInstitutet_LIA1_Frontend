import React from 'react';
import { NavLink } from 'react-router-dom';
import { Fingerprint, User, Page, Settings, EditPencil } from 'iconoir-react';

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
          <NavLink to="/identifications">
            <span className="dash-nav__icon">
              <Fingerprint />
            </span>
            <span>Identifications</span>
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
          <NavLink to="/signature">
            <span className="dash-nav__icon">
              <EditPencil />
            </span>
            <span>Signature requests</span>
            <span className="notification">3</span>
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
