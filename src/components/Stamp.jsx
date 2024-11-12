import React from 'react';
import logo from '../assets/images/logo-loading.png';

export const Stamp = ({ status, state }) => {
  return (
    <div className={`stamp shadow__general stamp--${state}`}>
      <div className="stamp__company">
        <img src={logo} alt="" />
        <span>Neuro</span>
      </div>
      <span className="stamp__status">{status}</span>
    </div>
  );
};
