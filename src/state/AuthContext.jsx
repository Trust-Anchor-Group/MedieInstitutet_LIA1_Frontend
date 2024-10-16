import React, { createContext, useEffect, useRef, useState } from 'react';
import { sessionStatus, apiLogout, refreshToken } from '../api/base-api.mjs';

const AuthContext = createContext();
const REFRESH_OFFSET_SECONDS = 300; // 5 minutes
const TOKEN_REQUEST_ATTEMPTS = 3;

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    isLoading: true,
    tokenExpiryTimestamp: null,
  };
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const isAuthenticatedRef = useRef(isAuthenticated);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [tokenExpiryTimestamp, setTokenExpiryTimestamp] = useState(
    initialState.tokenExpiryTimestamp
  );

  useEffect(() => {
    isAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated]);

  const checkAuth = async () => {
    if (isAuthenticated.current) {
      return;
    }

    setIsLoading(true);
    try {
      const data = await sessionStatus();

      if (data.success) {
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
    setTokenExpiryTimestamp(timestamp);
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
    setTokenExpiryTimestamp(initialState.tokenExpiryTimestamp);
  };

  const refreshAccessToken = async (attempt = 0) => {
    const maxAttempts = TOKEN_REQUEST_ATTEMPTS;
    const baseDelay = 5000;

    console.log('Requested a new access token...');
    try {
      const response = await refreshToken();
      if (response.success) {
        setTokenExpiryTimestamp(response.data.expires);
        console.log('Successfully requested a new access token...');
      } else {
        throw new Error('Token refresh unsuccessful');
      }
    } catch (error) {
      if (attempt < maxAttempts) {
        const jitter = Math.random() * 1000;
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt) + jitter,
          60000
        ); // Cap delay at 60 seconds
        console.log(`Attempt ${attempt + 1} failed. Retrying...`);
        setTimeout(async () => {
          await refreshAccessToken(attempt + 1);
        }, delay);
      } else {
        console.log('Failed to refresh access token after maximum attempts.');
        throw error;
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticatedRef.current && tokenExpiryTimestamp !== null) {
      const currentTimeSec = Math.floor(Date.now() / 1000);
      const refreshTimeSec = tokenExpiryTimestamp - REFRESH_OFFSET_SECONDS;
      const refreshDelayMs = (refreshTimeSec - currentTimeSec) * 1000;

      if (refreshDelayMs > 0) {
        setTimeout(() => {
          if (isAuthenticatedRef.current) {
            refreshAccessToken();
          } else {
            console.log(
              'is not authenticated anymore, not sending refresh req'
            );
          }
        }, refreshDelayMs);
      } else {
        console.log('The refresh time has already passed.');
      }
    }
  }, [tokenExpiryTimestamp]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
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
