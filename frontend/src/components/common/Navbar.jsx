import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PreviousPageButton from './PreviousPageButton';
import Icons from '../../utils/icons';
import SearchField from '../dashboard/components/SearchField';
import IconButton from './IconButton';
import ConfirmationDialog from './ConfirmationDialog';
import { ROUTES } from '../../utils/routes';

const Navbar = ({
  page,
  handleEditButton,
  car,
  handleSearchInputChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const isDashboardPage = location.pathname === `${ROUTES.DASHBOARD}`;
  const isCalendarPage = location.pathname === `${ROUTES.CALENDAR}`;
  const isCarPage = location.pathname.includes(`${ROUTES.CAR}`);
  const isEditDetailsPage = location.pathname.includes(
    `${ROUTES.EDIT_DETAILS}`
  );

  let title = page;
  if (isEditDetailsPage) {
    title =
      location.pathname === `${ROUTES.ADD_NEW_CAR}`
        ? 'Dodawanie nowego pojazdu'
        : `Edycja naprawy - ${car?.brand || ''} ${car?.model || ''}`;
  }

  const handleLogout = () => {
    navigate(`${ROUTES.LOGIN}`);
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
              destination={ROUTES.CALENDAR}
            />
            <IconButton
              icon={Icons.AddNew}
              destination={ROUTES.ADD_NEW_CAR}
            />
            <IconButton
              icon={Icons.Handyman}
              destination={ROUTES.CAR_PARTS}
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
      <IconButton
        icon={Icons.Handyman}
        destination={ROUTES.CAR_PARTS}
      />

      {isCalendarPage && (
        <IconButton
          icon={Icons.AddNew}
          destination={ROUTES.ADD_NEW_CAR}
        />
      )}
    </div>
  );
};

export default Navbar;
