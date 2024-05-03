import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../images/icons/search-icon.svg?react';
import EditIcon from '../../images/icons/edit-icon.svg?react';
import ReadyIcon from '../../images/icons/ready-icon.svg?react';
import DeleteIcon from '../../images/icons/delete-icon.svg?react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import OwnerIcon from '../../images/icons/person-icon.svg?react';
import CarIcon from '../../images/icons/car-icon.svg?react';
import ClockIcon from '../../images/icons/clock-icon.svg?react';

const Card = ({ model, owner, date }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditButton = () => {
    navigate('/edit-details');
  };

  const handleDeleteButton = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <div className="card">
      <ul className="car-data">
        <div className="card-icons">
          <ReadyIcon className="icon pink-icon" />
        </div>
        <li>
          <CarIcon className="icon pink-icon data-icon" />
          {model}
        </li>
        <li>
          <OwnerIcon className="icon pink-icon data-icon" />
          {owner}
        </li>
        <li>
          <ClockIcon className="icon pink-icon data-icon" />
          {date}
        </li>
        <div className="card-btns card-icons">
          <button
            className="edit-btn icons-btn"
            onClick={handleEditButton}
          >
            <EditIcon className="icon pink-icon" />
          </button>
          <button
            className="trash-btn icons-btn"
            onClick={handleDeleteButton}
          >
            <DeleteIcon className="icon pink-icon" />
          </button>
        </div>
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
