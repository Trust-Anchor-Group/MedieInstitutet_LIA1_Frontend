import React from 'react';
import { DashboardNav } from '../components/DashboardNav';

const DashLayout = ({ children }) => {
  return (
    <div className="dash-layout">
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashLayout;
