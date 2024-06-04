import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  return (
    <div className={`modal ${isVisible ? 'show' : ''}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
