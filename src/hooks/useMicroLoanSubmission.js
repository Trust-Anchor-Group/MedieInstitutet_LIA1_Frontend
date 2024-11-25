// src/hooks/useMicroLoanSubmission.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMicroLoan } from '../api/base-api.mjs';

export const useMicroLoanSubmission = () => {
    const navigate = useNavigate();
    // Stores submission feedback state for user notifications
    const [feedback, setFeedback] = useState(null);

    // Main submission handler orchestrating the loan creation process
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

    // Transforms form data into contract-compatible format
    // Separates role IDs from other contract data for cleaner structure
    const formatContractData = (data) => {
        const roles = {};
        // Only include roles object if all required participants are specified
        // This prevents partial role assignments in the contract (Not possible in contract)
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
        // Destructure to remove ID fields from main contract data
        const { creatorId, borrowerId, lenderId, trustProviderId, ...contractData } = data;
        return {
            ...contractData,
            roles
        };
    };

    // Handles API communication for loan creation
    // Includes logging for debugging and monitoring purposes
    const submitMicroLoan = async (contractData) => {
        console.log('Sending contract data:', contractData);
        const response = await createMicroLoan(contractData);
        console.log('Response received:', response);
        return response;
    };

    // Manages successful submission flow
    // Displays success message and redirects to dashboard after delay
    const handleSuccess = (response) => {
        setFeedback({
            type: 'success',
            message: response.message || 'Micro loan created successfully!'
        });
        // Allow time for user to see success message before redirect
        setTimeout(() => {
            navigate('/dashboard');
        }, 5000);
    };

    // Centralizes error handling for submission failures
    // Logs errors for debugging and displays user-friendly message
    const handleError = (error) => {
        console.error('Error in handleSubmit:', error);
        setFeedback({
            type: 'error',
            message: error.message || 'Failed to create micro loan'
        });
    };

    // Expose minimal interface for component consumption
    return {
        handleSubmit,
        feedback,
        setFeedback
    };
};