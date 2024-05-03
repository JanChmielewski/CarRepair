import React from 'react';
import SearchField from './SearchField';

function Navbar({ handleSearchInputChange }) {
  return (
    <nav>
      <div className="navbar-container">
        <SearchField
          handleSearchInputChange={handleSearchInputChange}
        />
      </div>
    </nav>
  );
}

export default Navbar;
