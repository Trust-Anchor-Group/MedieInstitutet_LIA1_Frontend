import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../state/UserContext';

export const ProfileCard = () => {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) return null;

  return (
    <div className="profile-card">
      <h3>Account details</h3>
      <ul>
        <li>
          <span>Username:</span>
          <span>{userInfo.userName}</span>
        </li>
        <li>
          <span>Email:</span>
          <span>{userInfo.eMail}</span>
        </li>
        <li>
          <span>Account created:</span>
          <span>{new Date(userInfo.created).toUTCString()}</span>
        </li>
        <li>
          <span>Phone number:</span>
          <span>{userInfo?.phoneNr || 'N/A'}</span>
        </li>
        <li>
          <span>ID</span>
          <span>{userInfo?.id || 'N/A'}</span>
        </li>
      </ul>
    </div>
  );
};
