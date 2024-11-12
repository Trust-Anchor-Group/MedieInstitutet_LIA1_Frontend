import React from 'react';
import { NavLink, Outlet, useLocation, useMatches } from 'react-router-dom';
import { DashboardNav } from '../../components/DashboardNav';
import * as Iconoir from 'iconoir-react';

const DashLayout = () => {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const currentRouteHandle = currentRoute?.handle;

  return (
    <div className="dash-layout">
      <DashboardNav />
      <div className="dash-layout__content">
        <h2>{currentRouteHandle?.title}</h2>
        {currentRouteHandle?.subLinks && (
          <nav>
            {currentRouteHandle?.subLinks.map((link, index) => {
              return (
                <NavLink
                  to={`${currentRoute.pathname}${link.path}`}
                  key={index}
                  className="btn__cta"
                >
                  {link.title}
                  {link.icon && React.createElement(Iconoir[link.icon])}
                </NavLink>
              );
            })}
          </nav>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;
