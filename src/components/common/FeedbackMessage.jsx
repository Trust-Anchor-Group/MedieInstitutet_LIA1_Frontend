// src/components/common/FeedbackMessage.jsx

import React from 'react';

// Reusable component for displaying user feedback messages
// Supports different message types (e.g., success, error, warning)
const FeedbackMessage = ({ type, message }) => {
    // Early return if no message to prevent rendering empty feedback container
    if (!message) return null;

    return (
        // Dynamic className allows styling based on feedback type
        // Uses consistent naming pattern: feedback-success, feedback-error, etc.
        <div className={`feedback feedback-${type}`}>
            {message}
        </div>
    );
};

export default FeedbackMessage;