import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import Icons from '../../../utils/icons';

const Card = ({ repairID, brand, model, owner, date }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditButton = () => {
    navigate(`/edit-details/${repairID}`);
  };

  const handleCardClick = () => {
    navigate(`/car/${repairID}`);
  };

  const handleDeleteButton = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <div className="card">
      <ul className="car-data">
        <li onClick={handleCardClick}>
          <Icons.Car className="icon pink-icon data-icon" />
          {brand} {model}
        </li>
        <li>
          <Icons.Owner className="icon pink-icon data-icon" />
          {owner}
        </li>
        <li>
          <Icons.Clock className="icon pink-icon data-icon" />
          {date}
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
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          setDeleteDialogOpen(false);
        }}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default Card;
