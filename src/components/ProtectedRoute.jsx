import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext.jsx';
import { LoadingScreen } from './LoadingScreen.jsx';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!isLoading) return <Outlet />;
};

export default ProtectedRoute;
