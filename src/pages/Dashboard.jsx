import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '../components/ProfileCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    // Clear both the token and userName from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <ProfileCard />
    </div>
  );
};

export default Dashboard;
