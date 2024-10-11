// src/components/FormField.jsx
import React from 'react';

// ==========================
// FormField Component
// Reusable component for creating configurable form fields with dynamic type, 
// label, required status, and options for dropdowns.
// ==========================

const FormField = ({ field, updateField, removeField }) => {
  return (
    <div className="form-field">
      {/* Input for the field label */}
      <input
        type="text"
        placeholder="Field Label"
        value={field.label}
        onChange={(e) => updateField(field.id, { label: e.target.value })}
      />

      {/* Select for choosing field type */}
      <select
        value={field.type}
        onChange={(e) => updateField(field.id, { type: e.target.value })}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="dropdown">Dropdown</option>
      </select>

      {/* Checkbox to mark field as required */}
      <label>
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => updateField(field.id, { required: e.target.checked })}
        />
        Required
      </label>

      {/* Conditional rendering for dropdown options */}
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
  );
};

export default FormField;