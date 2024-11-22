// src/hooks/useMicroLoanSubmission.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMicroLoan } from '../api/base-api.mjs';

export const useMicroLoanSubmission = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const contractData = formatContractData(data);
      const response = await submitMicroLoan(contractData);
      
      if (response.success) {
        handleSuccess(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const formatContractData = (data) => {
    const roles = {};

    // Only add roles if all IDs are present
    if (
      data.creatorId &&
      data.borrowerId &&
      data.lenderId &&
      data.trustProviderId
    ) {
      roles.creator = data.creatorId;
      roles.borrower = data.borrowerId;
      roles.lender = data.lenderId;
      roles.trustProvider = data.trustProviderId;
    }

    // Create new object without ID fields
    const { creatorId, borrowerId, lenderId, trustProviderId, ...contractData } = data;
    
    return {
      ...contractData,
      roles
    };
  };

  const submitMicroLoan = async (contractData) => {
    console.log('Sending contract data:', contractData);
    const response = await createMicroLoan(contractData);
    console.log('Response received:', response);
    return response;
  };

  const handleSuccess = (response) => {
    setFeedback({
      type: 'success',
      message: response.message || 'Micro loan created successfully!'
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
  };

  const handleError = (error) => {
    console.error('Error in handleSubmit:', error);
    setFeedback({
      type: 'error',
      message: error.message || 'Failed to create micro loan'
    });
  };

  return {
    handleSubmit,
    feedback,
    setFeedback
  };
};