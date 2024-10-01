import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h1>Welcome to Your Dashboard</h1>
      <p>Hello, {userName || 'User'}!</p>
      <p>You have successfully logged in.</p>
      <p>SOON this will mean you can do something!</p>
      <button onClick={handleLogout} className="btn-logout">Logout</button>
    </div>
  );
};

export default Dashboard;