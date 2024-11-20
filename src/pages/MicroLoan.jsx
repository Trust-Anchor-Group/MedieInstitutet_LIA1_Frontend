// src/pages/MicroLoan.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import UserContext from '../state/UserContext';
import MicroLoanForm from '../components/MicroLoanForm';
import { createMicroLoan } from '../api/base-api.mjs';
import { Banner } from '../components/Banner';
import moneyImage from '../assets/images/money.jpg';

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
      // Structure contract data with roles
      const roles = {};

      // If all legal IDs are filled, use them
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
      // Otherwise, all should be empty as per schema validation

      const contractData = {
        ...data,
        roles,
      };

      // Remove the individual ID fields as they're now in roles object
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
        <Banner
          imageSource={moneyImage}
          type="full"
          contentPosition="center"
          blur={true}
          textPosition="center"
        >
          <h1>Micro Loan Service</h1>
          <p>Create and manage micro loans with ease and transparency</p>
          <button onClick={handleStartLoan} className="btn__cta">
            Start a Micro Loan
          </button>
        </Banner>
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
