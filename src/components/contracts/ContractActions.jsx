// src/components/contract/ContractActions.jsx
import React from 'react';

// ContractActions handles the interactive elements of the contract interface,
// managing both status display and signing actions. It follows a presentational
// component pattern, receiving all necessary data and callbacks via props.
const ContractActions = ({ status, onSignContract }) => {
  // status prop: string representing current contract state (e.g., 'pending', 'signed')
  // onSignContract: callback function triggered when user initiates signing process
  return (
    // contract-card__actions wrapper provides consistent layout and spacing
    // for status indicators and action buttons
    <div className="contract-card__actions">
      <div className="contract-status">
        {/* status indicator dynamically adapts its appearance based on contract state,
         * utilizing CSS modifiers for visual state representation */}
        <span className={`status status--${status?.toLowerCase() || 'pending'}`}>
          {status || 'Pending'}
        </span>
      </div>
      {/* primary action button encapsulates contract signing interaction,
       * maintaining separation between UI triggering and business logic */}
      <button
        className="btn-primary btn-sm"
        onClick={onSignContract}
      >
        Sign
      </button>
    </div>
  );
};

export default ContractActions;