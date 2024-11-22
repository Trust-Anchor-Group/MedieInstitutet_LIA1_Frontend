// src/pages/MicroLoan.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import MicroLoanForm from '../components/MicroLoanForm';
import MicroLoanHero from '../components/microLoan/MicroLoanHero';
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
        <section className="microloan__form">
          {feedback && (
            <div className={`feedback feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}
          <MicroLoanForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </section>
      )}
    </div>
  );
};

export default MicroLoan;