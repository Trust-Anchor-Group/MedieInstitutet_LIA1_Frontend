import React from 'react'
import { FaSearch } from 'react-icons/fa';



const SearchTokenBar = ({ searchQuery, setSearchQuery }) => {
  
  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <form className="search-form">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </form>
  );
};

export default SearchTokenBar