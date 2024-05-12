import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import Icons from '../../../utils/icons';

const Card = ({ vinNumber, model, owner, date }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditButton = () => {
    navigate(`/edit-details/${vinNumber}`);
  };

  const handleDeleteButton = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <div className="card">
      <ul className="car-data">
        <div className="card-icons">
          <Icons.Completed className="icon pink-icon" />
        </div>
        <li>
          <Icons.Car className="icon pink-icon data-icon" />
          {model}
        </li>
        <li>
          <Icons.Owner className="icon pink-icon data-icon" />
          {owner}
        </li>
        <li>
          <Icons.Clock className="icon pink-icon data-icon" />
          {date}
        </li>
        <div className="card-btns card-icons">
          <button className="edit-btn icons-btn">
            <Icons.Edit
              className="icon pink-icon"
              onClick={handleEditButton}
            />
          </button>
          <button
            className="trash-btn icons-btn"
            onClick={handleDeleteButton}
          >
            <Icons.Remove className="icon pink-icon" />
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
