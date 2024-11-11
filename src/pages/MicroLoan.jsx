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
        console.log('Frontend - roles being send:', {
            creator: "2eaa2cb7-b249-6164-1c15-694a2b068140@legal.mateo.lab.tagroot.io",
            lender: data.lender || "",
            borrower: data.borrower || "",
            trustProvider: "2dc21fb3-87d7-1614-9414-9c6b3740ce78@legal.lab.tagroot.io"
        });

        try {

                // ! Temporary hardcoding of roles until legal identities are available in context
                const roles = {
                    creator: "2eaa2cb7-b249-6164-1c15-694a2b068140@legal.mateo.lab.tagroot.io",
                    trustProvider: "2dc21fb3-87d7-1614-9414-9c6b3740ce78@legal.lab.tagroot.io"
                };
    
                // Only add lender and borrower if they have valid values
                if (data.lender && data.lender.trim()) {
                    roles.lender = data.lender.trim();
                }
                if (data.borrower && data.borrower.trim()) {
                    roles.borrower = data.borrower.trim();
                }
    
                const contractData = {
                    ...data,
                    roles
                };         

            // Remove the individual role fields as they're now in the roles object
            delete contractData.lender;
            delete contractData.borrower;

            console.log('Sending contract data:', contractData); // ! bug logging

            const response = await createMicroLoan(contractData);
            console.log("Complete response object:", {
                fullResponse: response,
                responseData: response.data,
                contract: response.data?.contract,
                stringify: JSON.stringify(response, null, 2)
            });

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