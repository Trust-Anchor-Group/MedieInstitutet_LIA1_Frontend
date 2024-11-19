// utils/contractUtils.js

/**
 * Formats contract information into a structured object
 * @param {Object} contract - Raw contract data
 * @returns {Object} Formatted contract information
 */

// Main formatter that transforms raw contract data into a normalized structure
// Separates concerns into technical, participant, signing, and loan-specific information
export const formatContractInfo = (contract) => {
  // Destructure core contract elements for better readability and null-safety
  const parameters = contract.Contract?.parameters;
  const signatures = contract.Contract?.signature || [];
  const parts = contract.Contract?.parts;

  return {
      technicalInfo: extractTechnicalInfo(contract),
      partsInfo: extractPartsInfo(parts),
      signingStatus: extractSigningStatus(contract),
      loanInfo: extractLoanInfo(parameters)
  };
};

// Extracts metadata and configuration settings from the contract
// These fields control contract behavior and visibility in the system
const extractTechnicalInfo = (contract) => ({
  id: contract.Contract?.id,
  archiveOpt: contract.Contract?.archiveOpt,
  archiveReq: contract.Contract?.archiveReq,
  duration: contract.Contract?.duration,
  visibility: contract.Contract?.visibility,
  canActAsTemplate: contract.Contract?.canActAsTemplate,
});

// Processes contract participants information with privacy considerations
// Returns a map of roles to masked participant identifiers
const extractPartsInfo = (parts) => {
  // Default state assumes open participation for all roles
  const defaultInfo = {
      creator: 'Open to anyone',
      lender: 'Open to anyone',
      borrower: 'Open to anyone',
      trustProvider: 'Open to any Valid TP'
  };

  // Early return if no participants are specified
  if (!parts?.part) return defaultInfo;

  // Update default info with actual participant data when available
  // Normalizes TrustProvider role name to camelCase for consistency
  parts.part.forEach(part => {
      const role = part.role === 'TrustProvider' ? 'trustProvider' : part.role.toLowerCase();
      defaultInfo[role] = formatLegalId(part.legalId);
  });

  return defaultInfo;
};

// Masks legal identifiers for privacy, showing only first 4 characters
// Returns a default string if no identifier is provided
const formatLegalId = (id) => {
  if (!id) return 'Open to anyone';
  const firstFour = id.substring(0, 4);
  return `${firstFour}***`;
};

// Determines the signing status for each role in the contract
// Handles both array and object signature formats for backwards compatibility
const extractSigningStatus = (contract) => {
  // Helper function to check if a specific role has signed
  // Supports legacy single signature object format and new array format
  const getRoleStatus = (roleName) => {
      const signatures = contract?.Contract?.signature;
      if (!signatures) return false;
      
      // Handle array of signatures (Multiple signers)
      if (Array.isArray(signatures)) {
          return signatures.some(sig => sig?.role === roleName);
      }
      
      // Handle single signature object (Single signer)
      if (signatures && typeof signatures === 'object') {
          return signatures.role === roleName;
      }
      
      return false;
  };

  return {
      creator: getRoleStatus('Creator'),
      lender: getRoleStatus('Lender'),
      borrower: getRoleStatus('Borrower'),
      trustProvider: getRoleStatus('TrustProvider')
  };
};

// Extracts and normalizes loan-specific parameters from the contract
// Provides default "N/A" values for missing optional parameters
const extractLoanInfo = (parameters) => ({
  // Find specific parameters by name in the numericalParameter array
  amount: parameters?.numericalParameter?.find((p) => p.name === "Amount")?.value || "N/A",
  currency: parameters?.stringParameter?.value || "USD",
  installmentAmount: parameters?.numericalParameter?.find((p) => p.name === "InstallmentAmount")?.value || "N/A",
  interestRate: parameters?.numericalParameter?.find((p) => p.name === "InterestPerInstallment")?.value || "N/A",
  debtLimit: parameters?.numericalParameter?.find((p) => p.name === "DebtLimit")?.value || "N/A",
  commission: parameters?.numericalParameter?.find((p) => p.name === "CommissionPercent")?.value || "N/A",
  installmentInterval: parameters?.durationParameter?.value || "N/A",
});