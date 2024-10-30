import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '../components/ProfileCard';
import { getContractData } from '../api/base-api.mjs';


const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleClick = async () => {
    try {
      const response = await getContractData({
        contractId: "2e995e47-3ec2-07a4-c80b-b33a76dde53c@legal.mateo.lab.tagroot.io"
       });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Clear both the token and userName from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <button onClick={handleClick}>Backend Message</button>
      <div className="dashboard-container">
        <ProfileCard />
      </div>
    </>
  );
};

export default Dashboard;
