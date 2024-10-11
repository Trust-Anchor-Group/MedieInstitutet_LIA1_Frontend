// src/pages/tokenCreation/TemplateBanner.jsx
import React, { useState, useEffect, useRef } from 'react';
import TemplateModal from './TemplateModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TemplateThumbnail from './TemplateThumbnail';

const TemplateBanner = ({ onSelectTemplate }) => {
  // State hooks for UI control and data management
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const scrollContainerRef = useRef(null);

  // Effect hook to fetch template data on component mount
  useEffect(() => {
    fetch('/templates.json')
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error('Error loading templates:', error));
  }, []);

  // Toggle visibility of template selection area
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Update selected template for modal display
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  // Reset selected template to close modal
  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  // Pass selected template to parent and reset selection
  const handleSelectTemplate = () => {
    onSelectTemplate(selectedTemplate);
    setSelectedTemplate(null);
  };

  // Smooth scroll for template thumbnails
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`template-banner ${isExpanded ? 'expanded' : ''}`}>
      <button onClick={toggleExpand} className="template-banner__toggle">
        {isExpanded ? 'Hide Templates' : 'Show Templates'}
      </button>
      {isExpanded && (
        <div className="template-banner__content">
          <div className="scroll-button left" onClick={() => scroll('left')}>
            <ChevronLeft />
          </div>
          <div className="template-thumbnails" ref={scrollContainerRef}>
            {templates.map((template) => (
              <TemplateThumbnail
                key={template.id}
                template={template}
                onClick={handleTemplateClick}
              />
            ))}
          </div>
          <div className="scroll-button right" onClick={() => scroll('right')}>
            <ChevronRight />
          </div>
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