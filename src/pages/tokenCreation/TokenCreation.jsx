// src/pages/tokenCreation/TokenCreation.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TokenPreview from './TokenPreview';
import TemplateBanner from './TemplateBanner';
import { useFormFields } from '../../hooks/useFormFields';
import FormField from '../../components/FormField';

const TokenCreation = () => {
  const { formFields, setFormFields, addField, updateField, removeField, reorderFields } = useFormFields();
  const [tokenName, setTokenName] = useState('');
  const [tokenDescription, setTokenDescription] = useState('');

  const handleSelectTemplate = (template) => {
    setTokenName(template.name);
    setTokenDescription(template.description || '');
    setFormFields(template.fields);
  };

  // Function to save the form
  const saveForm = () => {
    const formData = {
      tokenName,
      tokenDescription,
      fields: formFields,
    };
    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'token-form.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="token-creation-page">
      <TemplateBanner onSelectTemplate={handleSelectTemplate} />
      <div className="token-creation-content">
        <div className="token-creation__form">
          <h1>Create Your Token</h1>
          <div className="token-basics">
            <input
              type="text"
              placeholder="Token Name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
            <textarea
              placeholder="Token Description"
              value={tokenDescription}
              onChange={(e) => setTokenDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-builder">
            <h2>Build Your Form</h2>
            <div className="field-buttons">
              <button onClick={() => addField('text')}>Add Text Field</button>
              <button onClick={() => addField('number')}>Add Number Field</button>
              <button onClick={() => addField('date')}>Add Date Field</button>
              <button onClick={() => addField('dropdown')}>Add Dropdown Field</button>
            </div>
            <DragDropContext onDragEnd={reorderFields}>
              <Droppable droppableId="form-fields">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {formFields.map((field, index) => (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FormField
                              field={field}
                              updateField={updateField}
                              removeField={removeField}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="preview-controls">
            <button onClick={saveForm} className="save-button">Save Token Form</button>
          </div>
        </div>
        {formFields.length > 0 && (
          <div className="token-creation__preview">
            <TokenPreview 
              formFields={formFields}
              tokenName={tokenName}
              tokenDescription={tokenDescription}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenCreation;