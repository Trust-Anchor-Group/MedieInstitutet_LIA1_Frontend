// src/pages/tokenCreation/TemplateModal.jsx
import React from 'react';

const TemplateModal = ({ template, onClose, onSelect }) => {
  return (
    <div className="template-modal">
      <div className="template-modal__overlay" onClick={onClose}></div>
      <div className="template-modal__content">
        <h2>{template.name}</h2>
        <p>{template.description}</p>
        <div className="template-preview">
          <h3>Fields:</h3>
          <ul>
            {template.fields.map((field, index) => (
              <li key={index}>{field.label} ({field.type})</li>
            ))}
          </ul>
        </div>
        <div className="template-modal__actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSelect}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;