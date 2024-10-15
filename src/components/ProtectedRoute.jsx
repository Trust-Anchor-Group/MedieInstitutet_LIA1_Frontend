import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext.jsx';
import { LoadingScreen } from './LoadingScreen.jsx';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!loading) return <Outlet />;
};

export default ProtectedRoute;
