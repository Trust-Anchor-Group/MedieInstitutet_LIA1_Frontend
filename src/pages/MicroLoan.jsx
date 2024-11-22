// src/pages/MicroLoan.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import UserContext from '../state/UserContext';
import MicroLoanForm from '../components/MicroLoanForm';
import MicroLoanHero from '../components/microLoan/MicroLoanHero';
import { createMicroLoan } from '../api/base-api.mjs';

const MicroLoan = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleStartLoan = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    console.log('handleSubmit called with data:', data);

    try {
      const roles = {};

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

      const contractData = {
        ...data,
        roles,
      };

      delete contractData.creatorId;
      delete contractData.borrowerId;
      delete contractData.lenderId;
      delete contractData.trustProviderId;

      console.log('Sending contract data:', contractData);

      const response = await createMicroLoan(contractData);
      console.log('Complete response object:', {
        fullResponse: response,
        responseData: response.data,
        contract: response.data?.contract,
        stringify: JSON.stringify(response, null, 2),
      });

      console.log('Response received:', response);

      if (response.success) {
        setFeedback({
          type: 'success',
          message: response.message || 'Micro loan created successfully!',
        });

        setTimeout(() => {
          setShowForm(false);
          navigate('/dashboard');
        }, 5000);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setFeedback({
        type: 'error',
        message: error.message || 'Failed to create micro loan',
      });
    }
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