import React from 'react';

import SearchField from './SearchField';
import CalendarIcon from '../../../images/icons/calendar-icon.svg?react';
import AddCarIcon from '../../../images/icons/add-box-icon.svg?react';
import LogoutIcon from '../../../images/icons/logout-icon.svg?react';
import IconButton from './IconButton';

function Navbar({ handleSearchInputChange }) {
  return (
    <nav>
      <div className="navbar-container">
        <SearchField
          handleSearchInputChange={handleSearchInputChange}
        />
        <div className="navbar-icons">
          <IconButton icon={CalendarIcon} destination="/calendar" />
          <IconButton icon={AddCarIcon} destination="/add-new-car" />
          <IconButton icon={LogoutIcon} destination="/" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
