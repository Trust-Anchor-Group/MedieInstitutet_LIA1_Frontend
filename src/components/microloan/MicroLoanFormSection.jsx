// src/components/microloan/MicroLoanFormSection.jsx
import React from 'react';
import MicroLoanForm from '../MicroLoanForm';
import FeedbackMessage from '../common/FeedbackMessage';

const MicroLoanFormSection = ({ feedback, onSubmit, onCancel }) => {
  return (
    <section className="microloan__form">
      <FeedbackMessage {...feedback} />
      <MicroLoanForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </section>
  );
};

export default MicroLoanFormSection;