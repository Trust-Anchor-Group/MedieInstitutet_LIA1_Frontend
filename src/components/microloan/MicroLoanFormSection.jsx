// src/components/microloan/MicroLoanFormSection.jsx

import React from 'react';
import MicroLoanForm from '../MicroLoanForm';
import FeedbackMessage from '../common/FeedbackMessage';

// Container component that combines form and feedback display
// Isolates form-related UI elements and their layout
const MicroLoanFormSection = ({ feedback, onSubmit, onCancel }) => {
    return (
        // Wrapper maintains consistent styling and spacing for form section
        // Uses BEM naming convention for CSS organization
        <section className="microloan__form">
            {/* Displays success/error messages above form
                Spreads feedback object to allow flexible message configuration */}
            <FeedbackMessage {...feedback} />

            {/* Main loan application form
                Handlers are passed through to maintain separation of concerns */}
            <MicroLoanForm
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </section>
    );
};

export default MicroLoanFormSection;