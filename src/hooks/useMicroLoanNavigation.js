// src/hooks/useMicroLoanNavigation.js

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';

export const useMicroLoanNavigation = () => {
    // Access authentication state from global context
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Controls visibility of the loan application form
    const [showForm, setShowForm] = useState(false);

    // Handles loan application initiation with auth check
    // Redirects to login if user is not authenticated
    const handleStartLoan = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setShowForm(true);
    };

    // Resets form visibility state when user cancels application
    const handleCancel = () => setShowForm(false);

    // Expose minimal interface for component consumption
    return {
        showForm,
        handleStartLoan,
        handleCancel
    };
};