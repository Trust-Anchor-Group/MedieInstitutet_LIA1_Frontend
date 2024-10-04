// src/components/TokenPreview.jsx
import React from 'react';

const TokenPreview = ({ formFields, tokenName, tokenDescription }) => {
  return (
    <div className="token-preview">
      <h2>Token Preview</h2>
      <h3>{tokenName}</h3>
      <p>{tokenDescription}</p>
      <form>
        {formFields.map((field) => {
          switch (field.type) {
            case 'text':
              return (
                <div key={field.id} className="preview-field">
                  <label>{field.label}{field.required && '*'}</label>
                  <input type="text" placeholder={`Enter ${field.label.toLowerCase()}`} />
                </div>
              );
            case 'number':
              return (
                <div key={field.id} className="preview-field">
                  <label>{field.label}{field.required && '*'}</label>
                  <input type="number" placeholder={`Enter ${field.label.toLowerCase()}`} />
                </div>
              );
            case 'date':
              return (
                <div key={field.id} className="preview-field">
                  <label>{field.label}{field.required && '*'}</label>
                  <input type="date" />
                </div>
              );
            case 'dropdown':
              return (
                <div key={field.id} className="preview-field">
                  <label>{field.label}{field.required && '*'}</label>
                  <select>
                    <option value="">Select an option</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option.trim()}>
                        {option.trim()}
                      </option>
                    ))}
                  </select>
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit" className="preview-submit">Submit Token</button>
      </form>
    </div>
  );
};

export default TokenPreview;