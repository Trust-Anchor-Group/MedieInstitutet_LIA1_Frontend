// src/pages/MicroLoan.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import UserContext from '../state/UserContext';
import MicroLoanForm from '../components/MicroLoanForm';
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
        console.log('handleSubmit called with data:', data); // ! bug logging
        try {
            const contractData = {
                ...data,
                roles: {
                    creator: userInfo?.userName,
                    lender: data.lender || userInfo?.userName,
                    borrower: data.borrower,
                    trustProvider: "SystemTrustProvider"
                }
            };

            // Remove the individual role fields as they're now in the roles object
            delete contractData.lender;
            delete contractData.borrower;

            console.log('Sending contract data:', contractData); // ! bug logging

            const response = await createMicroLoan(contractData);

            console.log('Response received:', response);

            if (response.success) {
                setFeedback({
                    type: 'success',
                    message: response.message || 'Micro loan created successfully!'
                });

                setTimeout(() => {
                    setShowForm(false);
                    navigate('/dashboard');
                }, 2000);
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setFeedback({
                type: 'error',
                message: error.message || 'Failed to create micro loan'
            });
        }
    };

    return (
        <div className="page__container">
            {!showForm ? (
                <section className="microloan__hero">
                    <div className="microloan__content">
                        <h1>Micro Loan Service</h1>
                        <p>Create and manage micro loans with ease and transparency</p>
                        
                        <div className="microloan__actions">
                            <button 
                                onClick={handleStartLoan}
                                className="btn-primary"
                            >
                                Start a Micro Loan
                            </button>
                        </div>
                    </div>
                </section>
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