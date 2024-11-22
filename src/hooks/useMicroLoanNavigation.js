// src/hooks/useMicroLoanNavigation.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';

export const useMicroLoanNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleStartLoan = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowForm(true);
  };

  const handleCancel = () => setShowForm(false);

  return {
    showForm,
    handleStartLoan,
    handleCancel
  };
};