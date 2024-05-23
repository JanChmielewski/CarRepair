import React from 'react';

import SearchField from './SearchField';
import IconButton from './IconButton';
import Icons from '../../../utils/icons';

function Navbar({ handleSearchInputChange }) {
  return (
    <nav>
      <div className="navbar-container">
        <SearchField
          handleSearchInputChange={handleSearchInputChange}
        />
        <div className="navbar-icons">
          <IconButton icon={Icons.Calendar} destination="/calendar" />
          <IconButton
            icon={Icons.AddNew}
            destination="/edit-details/add-new-car"
          />
          <IconButton icon={Icons.Logout} destination="/" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
