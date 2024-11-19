// src/components/contract/ContractContent.jsx

import React from 'react';
import LoanDetails from './LoanDetails';
import SigningStatus from './SigningStatus';

// ContractContent serves as a container component that composes the loan contract view
// by combining loan details and signing status information. It follows a composition pattern
// to maintain separation of concerns between different aspects of the contract display.
const ContractContent = ({ info }) => {
  // info prop is expected to contain:
  // - loanInfo: object containing loan terms, amounts, and conditions
  // - signingStatus: object tracking the contract's signing progress and validity
  
  return (
    // contract-card__content wrapper maintains consistent styling and spacing
    // for the contract information layout
    <div className="contract-card__content">
      {/* LoanDetails handles the display of loan-specific information,
          isolating loan data presentation logic */}
      <LoanDetails loanInfo={info.loanInfo} />

      {/* SigningStatus manages the display of contract signing progress,
          keeping signing state visualization separate from loan details */}
      <SigningStatus signingStatus={info.signingStatus} />
    </div>
  );
};

export default ContractContent;