// src/components/contracts/LoanDetails.jsx
import React from 'react';

// LoanDetails renders formatted loan information in a structured list.
// It handles the presentation of loan terms, amounts, and related financial details
const LoanDetails = ({ loanInfo }) => {
  // Defines the structure for loan information display,
  // organizing data into label-value pairs for consistent rendering
  const details = [
    { label: 'Loan Amount', value: `${loanInfo.amount} ${loanInfo.currency}` },
    { label: 'Installment Amount', value: `${loanInfo.installmentAmount} ${loanInfo.currency}` },
    { label: 'Interest Rate', value: `${loanInfo.interestRate}%` },
    { label: 'Debt Limit', value: `${loanInfo.debtLimit} ${loanInfo.currency}` },
    { label: 'Commission', value: `${loanInfo.commission}%` },
    { label: 'Payment Interval', value: loanInfo.installmentInterval }
  ];

  return (
    <div className="loan-details">
      {/* Renders each loan detail in a consistent layout structure,
          using the label as a unique identifier for list items */}
      {details.map(({ label, value }) => (
        <div key={label} className="loan-detail">
          <span className="label">{label}:</span>
          <span className="value">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default LoanDetails;