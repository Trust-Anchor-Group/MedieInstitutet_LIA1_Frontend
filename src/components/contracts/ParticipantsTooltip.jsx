// src/components/contracts/ParticipantsTooltip.jsx

import React from 'react';
import { Users } from 'lucide-react';

// Displays contract participants in a hover tooltip using the Users icon
// participants prop expects an object with creator, lender, borrower, and trustProvider fields
const ParticipantsTooltip = ({ participants }) => {
  return (
    // Container div uses .info-icon class for positioning and hover behavior
    <div className="info-icon" title="Assigned Participants">
      {/* Users icon serves as the tooltip trigger */}
      <Users size={20} />

      {/* Tooltip content renders on hover via CSS - see associated styles */}
      <div className="info-tooltip">
        <h2>Assigned Participants</h2>
        {/* Display each participant role and their associated identifier/name */}
        <p><strong>Creator:</strong> {participants.creator}</p>
        <p><strong>Lender:</strong> {participants.lender}</p>
        <p><strong>Borrower:</strong> {participants.borrower}</p>
        <p><strong>Trust Provider:</strong> {participants.trustProvider}</p>
      </div>
    </div>
  );
};

export default ParticipantsTooltip;