// src/pages/tokenCreation/TemplateThumbnail.jsx
import React from 'react';

// This functional component represents a thumbnail for a template in a token creation interface
const TemplateThumbnail = ({ template, onClick }) => (
  <div
    className="template-thumbnail"
    // Passing an inline function to handle click events, which calls the passed onClick function with the template data
    onClick={() => onClick(template)}
  >
    <span className="template-thumbnail__title">{template.name}</span>
  </div>
);

export default TemplateThumbnail;