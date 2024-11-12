import React, { createContext, useEffect, useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { accountInfo } from '../api/base-api.mjs';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    userInfo: null,
  };
  const [userInfo, setUserInfo] = useState(initialState.userInfo);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const getUserInfo = async () => {
          const response = await accountInfo();
          setUserInfo(response.data);
        };
        getUserInfo();
      } catch (error) {}
    }
  }, [isAuthenticated]);

  const updateUserInfoId = (id) => {
    setUserInfo({ ...userInfo, id });
  };

  const resetUserState = () => {
    setUserInfo(initialState.userInfo);
  };

  return (
    <UserContext.Provider
      value={{ userInfo, resetUserState, updateUserInfoId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
