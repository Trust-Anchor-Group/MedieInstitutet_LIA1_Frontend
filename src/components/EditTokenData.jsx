import React, { useState } from 'react';

const EditTokenData = ({ token, onSave }) => {
    const [formData, setFormData] = useState({ ...token });

    const handleChange = (e) => {
    const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
  };


  return (
    <form onSubmit={handleSubmit} className='form-edit'>
      <label>
        New price:
        <input
          type="number"
          min={1}
           //Is used to allow decimal values
          step="any"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        New quantity:
        <input
         type="number"
         min={1}
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditTokenData;
