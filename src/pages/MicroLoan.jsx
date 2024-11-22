// src/pages/MicroLoan.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import MicroLoanHero from '../components/microloan/MicroLoanHero';
import MicroLoanFormSection from '../components/microloan/MicroLoanFormSection';
import { useMicroLoanSubmission } from '../hooks/useMicroLoanSubmission';

const MicroLoan = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const { handleSubmit, feedback } = useMicroLoanSubmission();

  const handleStartLoan = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowForm(true);
  };

  return (
    <div className="page__container">
      {!showForm ? (
        <MicroLoanHero onStartLoan={handleStartLoan} />
      ) : (
        <MicroLoanFormSection
          feedback={feedback}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default MicroLoan;