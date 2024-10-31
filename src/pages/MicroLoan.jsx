// src/pages/MicroLoan.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../state/AuthContext';
import UserContext from '../state/UserContext';

const MicroLoan = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleStartLoan = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        // We'll expand this in the next implementation phase
        console.log('Starting micro loan process');
    };

    return (
        <div className="page__container">
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
        </div>
    );
};

export default MicroLoan;