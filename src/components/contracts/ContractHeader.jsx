// src/components/contracts/ContractHeader.jsx

import React from 'react';
import ContractInfoTooltip from './ContractInfoTooltip';
import ParticipantsTooltip from './ParticipantsTooltip';

// Displays the header section of a contract card, including the contract name,
// template status, and tooltips for technical and participant information
const ContractHeader = ({ info, isTemplate, contractName, copiedId, onCopyId }) => {
  return (
    <div className="contract-card__header">
      <h3>
        {/* Fallback to 'Contract' if no contract name is provided */}
        {contractName || 'Contract'}
        {/* Conditional rendering of template badge for template contracts */}
        {isTemplate && <span className="template-badge">Template</span>}
      </h3>

      <div className="header-icons">
        {/* Tooltip displaying technical details with copy-to-clipboard functionality */}
        <ContractInfoTooltip
          info={info.technicalInfo}
          copiedId={copiedId}    // Tracks copy state for UI feedback
          onCopyId={onCopyId}    // Callback to handle ID copying
        />
        {/* Tooltip showing contract participants and their roles */}
        <ParticipantsTooltip participants={info.partsInfo} />
      </div>
    </div>
  );
};

export default ContractHeader;