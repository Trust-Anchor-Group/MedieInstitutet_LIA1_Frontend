// src/components/contracts/ContractCard.jsx

import React from 'react';
import ContractHeader from './ContractHeader';
import ContractContent from './ContractContent';
import ContractActions from './ContractActions';
import { formatContractInfo } from '../../utils/contractUtils';

// ContractCard displays a contract's details in a card format with header, content, and action sections
// Props:
// - contract: Contract object containing all contract data including status and template flags
// - onSignContract: Callback function triggered when user signs the contract
// - copiedId: Currently copied contract ID for managing copy button state
// - onCopyId: Callback function to handle contract ID copying functionality
const ContractCard = ({ contract, onSignContract, copiedId, onCopyId }) => {
  // Format raw contract data into a normalized structure for child components
  // This prevents repetitive null checks and provides consistent data access
  const info = formatContractInfo(contract);

  return (
    <div className="contract-card">
      <ContractHeader
        info={info}
        // Check if contract can be used as a template - converts string 'true' to boolean
        isTemplate={contract.Contract?.canActAsTemplate === 'true'}
        // Safely access nested friendly name property with optional chaining
        contractName={contract.Contract?.Create?.FriendlyName?.String?.value}
        copiedId={copiedId}
        onCopyId={onCopyId}
      />
      <ContractContent
        info={info}
      />
      <ContractActions
        // Pass contract status for determining available actions
        status={contract.Contract?.status?.state}
        onSignContract={onSignContract}
      />
    </div>
  );
};

export default ContractCard;