import React, { useEffect, useState } from 'react';

const DeleteConfirmationDialog = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
    }
  }, [isOpen]);

  const handleConfirmDelete = () => {
    console.log('Delete action confirmed');
    onConfirm();
  };

  const handleCancelDelete = () => {
    console.log('Delete action canceled');
    onCancel();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className={`modal-content ${isClosing ? 'slide-up' : ''}`}>
        <h2>Czy na pewno chcesz usunąć tę pozycję?</h2>
        <div className="modal-buttons">
          <button
            className="confirm-btn"
            onClick={handleConfirmDelete}
          >
            Tak, usuń
          </button>
          <button className="cancel-btn" onClick={handleCancelDelete}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
