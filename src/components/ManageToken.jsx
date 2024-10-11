import React, { useState } from 'react';

const ManageToken = ({ token, onSave }) => {
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
    <form onSubmit={handleSubmit} className='editForm'>
      <label>
        New price:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        New quantity:
        <input
         type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ManageToken;
