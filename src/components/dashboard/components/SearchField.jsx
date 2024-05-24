import React from 'react';
import Icons from '../../../utils/icons';

function SearchField({ handleSearchInputChange }) {
  return (
    <div className="search-field">
      <Icons.Search className="search-icon" />
      <input
        className="navbar-search"
        type="text"
        placeholder="Szukaj..."
        onChange={handleSearchInputChange}
      />
    </div>
  );
}

export default SearchField;
