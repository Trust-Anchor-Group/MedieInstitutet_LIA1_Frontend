import React from 'react';
import { useLocation } from 'react-router-dom';
import { IdCard } from '../../../components/IdCard';

const IdDetailsPage = () => {
  const location = useLocation();
  const { id } = location.state || {};
  return <IdCard id={id} />;
};

export default IdDetailsPage;
