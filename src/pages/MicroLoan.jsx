// src/pages/MicroLoan.jsx
import React from 'react';
import MicroLoanHero from '../components/microloan/MicroLoanHero';
import MicroLoanFormSection from '../components/microloan/MicroLoanFormSection';
import { useMicroLoanSubmission } from '../hooks/useMicroLoanSubmission';
import { useMicroLoanNavigation } from '../hooks/useMicroLoanNavigation';

const MicroLoan = () => {
  const { handleSubmit, feedback } = useMicroLoanSubmission();
  const { showForm, handleStartLoan, handleCancel } = useMicroLoanNavigation();

  return (
    <div className="page__container">
      {!showForm ? (
        <MicroLoanHero onStartLoan={handleStartLoan} />
      ) : (
        <MicroLoanFormSection
          feedback={feedback}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default MicroLoan;