// src/components/contracts/SigningStatus.jsx
import React from 'react';
// SigningStatus displays the signing state for all parties involved in a contract
// - signingStatus: Object containing boolean flags for each role's signing state
const SigningStatus = ({ signingStatus = {} }) => {
  // Define all possible contract signatories with their display labels
  // Default each status to false if the corresponding property doesn't exist
  // This prevents runtime errors if signingStatus is incomplete or malformed
  const roles = [
    { label: 'Creator', status: signingStatus?.creator || false },
    { label: 'Lender', status: signingStatus?.lender || false },
    { label: 'Borrower', status: signingStatus?.borrower || false },
    { label: 'Trust Provider', status: signingStatus?.trustProvider || false }
  ];

  return (
    <div className="signing-status">
      <h4 className="signing-status__heading">Signing Status:</h4>
      {/* Grid layout with 2 columns for better space utilization on various screen sizes */}
      <div className="signing-status__grid">
        {/* Iterate through roles to create consistent status indicators */}
        {roles.map(({ label, status }) => (
          <div key={label} className="signing-role">
            <span className="signing-role__label">{label}:</span>
            {/* Dynamic className based on signing status for visual feedback */}
            <span className={`signing-role__status ${status ? 'status--signed' : 'status--unsigned'}`}>
              ({status ? 'Signed' : 'Unsigned'})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SigningStatus;