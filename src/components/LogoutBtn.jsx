import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import UserContext from '../state/UserContext';
import { apiLogout } from '../api/base-api.mjs';

export const LogoutBtn = () => {
  const { resetAuthState } = useContext(AuthContext);
  const { resetUserState } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
      resetAuthState();
      resetUserState();
      navigate('/');
      console.log('logout success');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <button className="btn__logout" onClick={handleLogout}>
      Sign out
    </button>
  );
};
