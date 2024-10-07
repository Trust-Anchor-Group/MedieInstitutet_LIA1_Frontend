// src/hooks/useFormFields.js
import { useState } from 'react';

// ==========================
// useFormFields Hook
// ==========================
// A custom React hook for managing a list of form fields.
// It provides operations for adding, updating, removing, and reordering fields.

export const useFormFields = (initialFields = []) => {
  // Initialize form fields with an empty array or provided initial fields
  const [formFields, setFormFields] = useState(initialFields);

  // Function to add a new field of specified type to the form
  const addField = (type) => {
    // Create a new field object with a unique id based on the current time
    const newField = {
      id: `field-${Date.now()}`,
      type,
      label: '',
      required: false,
      // Only create options array for dropdown type
      options: type === 'dropdown' ? [] : undefined,
    };
    // Add the new field to the state, creating a new array reference
    setFormFields([...formFields, newField]);
  };

  // Function to update an existing field's properties
  const updateField = (id, updates) => {
    // Map through each field, updating if the id matches, otherwise keep as is
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  // Function to remove a field from the form
  const removeField = (id) => {
    // Filter out the field with the specified id
    setFormFields(formFields.filter(field => field.id !== id));
  };

  // Function to reorder the fields in the form
  const reorderFields = (result) => {
    // If there's no destination, the drag operation was cancelled
    if (!result.destination) return;

    // Create a copy of formFields for manipulation
    const items = Array.from(formFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    // Insert the item at its new position
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the reordered array
    setFormFields(items);
  };

  // Return an object containing the form fields state and manipulation functions
  return {
    formFields,
    setFormFields,
    addField,
    updateField,
    removeField,
    reorderFields,
  };
};