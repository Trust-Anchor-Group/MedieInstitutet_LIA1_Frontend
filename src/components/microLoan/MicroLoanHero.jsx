// src/components/microloan/MicroLoanHero.jsx
import React from 'react';
import { Banner } from '../Banner';
import moneyImage from '../../assets/images/money.jpg';

const MicroLoanHero = ({ onStartLoan }) => {
  return (
    <Banner
      imageSource={moneyImage}
      type="full"
      contentPosition="center"
      blur={true}
      textPosition="center"
    >
      <h1>Micro Loan Service</h1>
      <p>Create and manage micro loans with ease and transparency</p>
      <button onClick={onStartLoan} className="btn__cta">
        Start a Micro Loan
      </button>
    </Banner>
  );
};

export default MicroLoanHero;