// src/pages/TokenCreation.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TokenPreview from './tokenPreview';

const TokenCreation = () => {
  const [formFields, setFormFields] = useState([]);
  const [tokenName, setTokenName] = useState('');
  const [tokenDescription, setTokenDescription] = useState('');

  // Function to add a new field to the form
  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}`,
      type,
      label: '',
      required: false,
      options: type === 'dropdown' ? [] : undefined,
    };
    setFormFields([...formFields, newField]);
  };

  // Function to update a field
  const updateField = (id, updates) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  // Function to remove a field
  const removeField = (id) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  // Function to handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormFields(items);
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
    <div className="token-creation">
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
          <DragDropContext onDragEnd={onDragEnd}>
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
                          className="form-field"
                        >
                          <input
                            type="text"
                            placeholder="Field Label"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                          />
                          <select
                            value={field.type}
                            onChange={(e) => updateField(field.id, { type: e.target.value })}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                            <option value="dropdown">Dropdown</option>
                          </select>
                          <label>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            />
                            Required
                          </label>
                          {field.type === 'dropdown' && (
                            <input
                              type="text"
                              placeholder="Options (comma-separated)"
                              value={field.options ? field.options.join(',') : ''}
                              onChange={(e) => updateField(field.id, { options: e.target.value.split(',') })}
                            />
                          )}
                          <button onClick={() => removeField(field.id)}>Remove</button>
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
  );
};

export default TokenCreation;