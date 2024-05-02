// SearchField.jsx
import React from 'react';

function SearchField({ searchQuery, handleSearchInputChange }) {
  return (
    <input
      className="navbar-search"
      type="text"
      placeholder="Szukaj"
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
  );
}

export default SearchField;
