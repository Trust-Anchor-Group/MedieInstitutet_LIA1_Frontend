import React, { createContext, useEffect, useRef, useState } from 'react';
import { sessionStatus, apiLogout } from '../api/base-api.mjs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    isLoading: true,
  };
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const isAuthenticatedRef = useRef(isAuthenticated);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  const validateSession = async () => {
    if (isAuthenticated.current) return;

    setIsLoading(true);
    try {
      const response = await sessionStatus();

      if (response.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const loginState = (timestamp) => {
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
    setIsLoading(false);
  };

  useEffect(() => {
    isAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated]);

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
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
