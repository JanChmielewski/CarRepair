import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../../utils/icons';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import Snackbar from '@mui/material/Snackbar';
import { ROUTES } from '../../../utils/routes';
import { statusMap } from '../../../utils/statusMap';
import { API_ENDPOINTS } from '../../../utils/api/api_endpoints';

const Card = ({
  repairID,
  brand,
  model,
  owner,
  status,
  refreshCars,
  removeCar,
}) => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      setDialogOpen(false);
    }
  }, [isDeleting]);

  const handleEditButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${ROUTES.EDIT_DETAILS}/${repairID}`);
  };

  const handleCardClick = (e) => {
    if (isDialogOpen || isDeleting) {
      console.log(
        `Attempted to navigate to car ID: ${repairID}, but it's being deleted or dialog is open`
      );
      return;
    }
    console.log(`Navigating to details of car ID: ${repairID}`);
    navigate(`${ROUTES.CAR}/${repairID}`);
  };

  const handleDeleteButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      `Opening delete confirmation for car ID: ${repairID}`
    );
    setDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log(`Confirming deletion of car ID: ${repairID}`);
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(
        `${API_ENDPOINTS.DELETE_CAR}${repairID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Car with id: ${repairID} deleted successfully`);
      removeCar(repairID);
      setSnackbarOpen(true); // Pokazanie Snackbar po pomyślnym usunięciu samochodu
      console.log('Snackbar should be open now'); // Debug log
    } catch (error) {
      console.error('Error deleting car:', error);
    } finally {
      setIsDeleting(false);
      setDialogOpen(false);
      refreshCars(); // Odświeżenie listy samochodów
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <ul className="car-data">
        <li>
          <Icons.Car className="icon pink-icon data-icon" />
          {brand} {model}
        </li>
        <li>
          <Icons.Owner className="icon pink-icon data-icon" />
          {owner}
        </li>
        <li>
          <Icons.Clock className="icon pink-icon data-icon" />
          {statusMap[status]}
        </li>
        <li className="card-btns card-icons">
          <button
            className="dashboard-edit-btn icons-btn"
            onClick={handleEditButton}
          >
            <Icons.Edit className="icon pink-icon" />
          </button>
          <button
            className="trash-btn icons-btn"
            onClick={handleDeleteButton}
          >
            <Icons.Remove className="icon pink-icon" />
          </button>
        </li>
      </ul>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDialogOpen(false)}
        title="Czy na pewno chcesz usunąć tę pozycję?"
        confirmButtonText="Tak, usuń"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Samochód został pomyślnie usunięty"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
};

export default Card;
