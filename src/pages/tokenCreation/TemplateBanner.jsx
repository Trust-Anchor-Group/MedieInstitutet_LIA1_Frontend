// src/pages/tokenCreation/TemplateBanner.jsx
import React, { useState, useEffect } from 'react';
import TemplateModal from './TemplateModal';

const TemplateBanner = ({ onSelectTemplate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch templates from JSON file
    fetch('/templates.json')
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error('Error loading templates:', error));
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleSelectTemplate = () => {
    onSelectTemplate(selectedTemplate);
    setSelectedTemplate(null);
  };

  return (
    <div className={`template-banner ${isExpanded ? 'expanded' : ''}`}>
      <button onClick={toggleExpand} className="template-banner__toggle">
        {isExpanded ? 'Hide Templates' : 'Show Templates'}
      </button>
      {isExpanded && (
        <div className="template-thumbnails">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-thumbnail"
              onClick={() => handleTemplateClick(template)}
            >
              <span className="template-thumbnail__title">{template.name}</span>
            </div>
          ))}
        </div>
      )}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={handleCloseModal}
          onSelect={handleSelectTemplate}
        />
      )}
    </div>
  );
};

export default TemplateBanner;