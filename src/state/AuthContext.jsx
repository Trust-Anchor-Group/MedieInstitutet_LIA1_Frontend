import React, { createContext, useEffect, useState } from 'react';
import { sessionStatus, apiLogout } from '../api/base-api.mjs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    loading: true,
  };
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [loading, setLoading] = useState(initialState.loading);

  const checkAuth = async () => {
    console.log('checkAuth fired...');
    setLoading(true);
    try {
      const data = await sessionStatus();
      console.log('sessionStatus:', data);
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      console.log('checkAuth finished...');
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Delay for 2 seconds
    }
  };

  const loginState = () => {
    setIsAuthenticated(true);
  };

  const logoutState = async () => {
    try {
      await apiLogout();
      resetAuthState();
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const resetAuthState = () => {
    setIsAuthenticated(initialState.isAuthenticated);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        checkAuth,
        logoutState,
        loginState,
        resetAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
