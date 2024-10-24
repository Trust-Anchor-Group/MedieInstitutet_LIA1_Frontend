import React from 'react';
import { DashboardNav } from '../components/DashboardNav';

const DashLayout = ({ children }) => {
  return (
    <div className="dash-layout">
      <DashboardNav />
      <div className="dash-layout__content">{children}</div>
    </div>
  );
};

export default DashLayout;
