import React from 'react';
import loadingImage from '../assets/images/loading.gif';

export const LoadingScreen = () => {
  return (
    <div className="loading__screen">
      <div className="loading__content">
        <img src={loadingImage} alt="" className="loading__spinner" />
        <span>Loading...</span>
      </div>
    </div>
  );
};
