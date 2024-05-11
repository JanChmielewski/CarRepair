import React from 'react';

function SearchField({ handleSearchInputChange }) {
  return (
    <input
      className="navbar-search"
      type="text"
      placeholder="Search"
      onChange={handleSearchInputChange}
    />
  );
}

export default SearchField;
