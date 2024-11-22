// src/components/common/FeedbackMessage.jsx
import React from 'react';

const FeedbackMessage = ({ type, message }) => {
  if (!message) return null;
  
  return (
    <div className={`feedback feedback-${type}`}>
      {message}
    </div>
  );
};

export default FeedbackMessage;