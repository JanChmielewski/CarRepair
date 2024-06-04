import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PreviousPageButton from './PreviousPageButton';
import Icons from '../../utils/icons';
import SearchField from '../dashboard/components/SearchField';
import IconButton from './IconButton';
import ConfirmationDialog from './ConfirmationDialog';

const Navbar = ({
  page,
  handleEditButton,
  car,
  handleSearchInputChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const isDashboardPage = location.pathname === '/dashboard';
  const isCalendarPage = location.pathname === '/calendar';
  const isCarPage = location.pathname.includes('/car/');
  const isEditDetailsPage =
    location.pathname.includes('/edit-details/');

  let title = page;
  if (isEditDetailsPage) {
    title =
      location.pathname === '/edit-details/add-new-car'
        ? 'Dodawanie nowego pojazdu'
        : `Edycja naprawy - ${car?.brand || ''} ${car?.model || ''}`;
  }

  const handleLogout = () => {
    navigate('/');
  };

  if (isDashboardPage) {
    return (
      <nav>
        <div className="navbar-container">
          <SearchField
            handleSearchInputChange={handleSearchInputChange}
          />
          <div className="navbar-icons">
            <IconButton
              icon={Icons.Calendar}
              destination="/calendar"
            />
            <IconButton
              icon={Icons.AddNew}
              destination="/edit-details/add-new-car"
            />
            <IconButton
              icon={Icons.Logout}
              onClick={() => setLogoutDialogOpen(true)}
            />
          </div>
        </div>
        <ConfirmationDialog
          isOpen={isLogoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          onConfirm={handleLogout}
          onCancel={() => setLogoutDialogOpen(false)}
          title="Czy na pewno chcesz się wylogować?"
          confirmButtonText="Tak, wyloguj"
        />
      </nav>
    );
  }

  return (
    <div className="display-navbar">
      <PreviousPageButton
        buttonColor={'black'}
        arrowClassName="arrow-car-display"
      />
      <h2 className="navbar-header">{title}</h2>
      {isCarPage && (
        <button className="edit-btn" onClick={handleEditButton}>
          <Icons.Edit className="icon black-icon" />
        </button>
      )}
      {isCalendarPage && (
        <IconButton
          icon={Icons.AddNew}
          destination="/edit-details/add-new-car"
        />
      )}
    </div>
  );
};

export default Navbar;
