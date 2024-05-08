import React from 'react';

const DeleteConfirmationDialog = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    console.log('Delete action confirmed');
    onConfirm();
  };

  const handleCancelDelete = () => {
    console.log('Delete action canceled');
    onCancel();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Czy na pewno chcesz usunąć?</h2>
        <div className="modal-buttons">
          <button
            className="confirm-btn"
            onClick={handleConfirmDelete}
          >
            Tak
          </button>
          <button
            className="cancel-btn"
            onClick={handleCancelDelete}
            style={{ backgroundColor: '#ff0099', color: '#151515' }}
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
