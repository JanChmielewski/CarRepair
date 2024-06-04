import React, { useEffect, useState } from 'react';

const ConfirmationDialog = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  confirmButtonText,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    console.log('Action confirmed');
    onConfirm();
  };

  const handleCancel = () => {
    console.log('Action canceled');
    onCancel();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className={`modal-content ${isClosing ? 'slide-up' : ''}`}>
        <h2>{title}</h2>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>
            {confirmButtonText}
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
