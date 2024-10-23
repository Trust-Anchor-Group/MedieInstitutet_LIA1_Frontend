import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '../components/ProfileCard';

const Dashboard = () => {
  const navigate = useNavigate();

  return <ProfileCard />;
};

export default Dashboard;
