// src/pages/ContractsPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../components/LoadingScreen";
import ContractCard from "../components/contracts/ContractCard";
import useContracts from '../hooks/useContracts';

const ContractsPage = () => {
  // Custom hook fetches and manages contract data, loading state, and potential errors
  const { contracts, isLoading, error } = useContracts();
  const navigate = useNavigate();

  // Tracks the ID of recently copied contract for UI feedback
  // Will be reset to null after 2 seconds
  const [copiedId, setCopiedId] = useState(null);

  // Navigates to the contract signing page with the specific contract ID
  const handleSignContract = (contractId) => {
    navigate(`/contracts/sign/${contractId}`);
  };

  // Handles copying contract ID to clipboard with temporary UI feedback
  // Uses the native clipboard API with fallback error handling
  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      // Reset the copied status after 2 seconds for UI feedback
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Note: Could be enhanced with user feedback for clipboard failure
    }
  };

  // Show loading screen while fetching contracts
  if (isLoading) return <LoadingScreen />;

  return (
    <div className="page__container">
      <section className="contracts__section">
        <h1>Available Contracts</h1>
        {/* Display error message if contract fetching fails */}
        {error && <div className="feedback feedback-error">{error}</div>}
        
        {/* Grid layout for contract cards */}
        <div className="contracts__grid">
          {contracts.map((contract, index) => (
            // ContractCard handles individual contract display and actions
            // copiedId is passed to show copy confirmation on specific card
            <ContractCard
              key={index}
              contract={contract}
              onSignContract={() => handleSignContract(contract.Contract?.id)}
              copiedId={copiedId}
              onCopyId={handleCopyId}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContractsPage;