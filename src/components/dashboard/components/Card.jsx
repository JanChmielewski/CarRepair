import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../../utils/icons';
import ConfirmationDialog from '../../common/ConfirmationDialog';

const Card = ({ repairID, brand, model, owner, date }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleEditButton = (e) => {
    e.stopPropagation();
    navigate(`/edit-details/${repairID}`);
  };

  const handleCardClick = () => {
    navigate(`/car/${repairID}`);
  };

  const handleDeleteButton = (e) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  return (
    <div className="card">
      <ul className="car-data" onClick={handleCardClick}>
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
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false);
          // Add delete logic here
        }}
        onCancel={() => setDialogOpen(false)}
        title="Czy na pewno chcesz usunąć tę pozycję?"
        confirmButtonText="Tak, usuń"
      />
    </div>
  );
};

export default Card;
